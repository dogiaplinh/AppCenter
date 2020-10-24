import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Appbar, Card } from "react-native-paper";
import { useSelector } from "react-redux";
import apiClient from "../utils/ApiClient";
import { StackParamList } from "../models/ParamList";
import { AllState } from "../store";
import { dateBefore } from "../utils/DateUtils";

type Props = {
  navigation: StackNavigationProp<StackParamList, "App">;
  route: RouteProp<StackParamList, "App">;
};
const AppScreen = ({ navigation, route }: Props) => {
  const app = route.params.app;
  const [latestVersion, setLatestVersion] = useState({ value: "", rate: 0 });
  const [activeDevice, setActiveDevice] = useState({ daily: 0, weekly: 0, monthly: 0 });
  useEffect(() => {
    (async () => {
      const now = new Date();
      const versionList = await apiClient.getVersions(
        app.owner.name,
        app.name,
        dateBefore(now, 7),
        dateBefore(now, 1),
      );
      if (versionList?.versions?.length > 0) {
        const lastItem = versionList.versions[versionList.versions.length - 1];
        setLatestVersion({
          value: lastItem.version,
          rate: (lastItem.count / versionList.total) * 100,
        });
      }
      const activeDeviceCounts = await apiClient.getActiveDeviceCounts(
        app.owner.name,
        app.name,
        dateBefore(now, 7),
        dateBefore(now, 1),
      );
      if (activeDeviceCounts?.daily?.length > 0) {
        const lastIndex = activeDeviceCounts.daily.length - 1;
        setActiveDevice({
          weekly: activeDeviceCounts.weekly[lastIndex].count,
          daily: activeDeviceCounts.daily[lastIndex].count,
          monthly: activeDeviceCounts.monthly[lastIndex].count,
        });
      }
    })();
  }, []);
  const goModelStats = useCallback(async () => {
    const now = new Date();
    const models = await apiClient.getModels(app.owner.name, app.name, dateBefore(now, 7));
    navigation.push("GridStats", {
      title: "Models",
      data: { total: models.total, values: models.models },
      labelField: "model_name",
    });
  }, []);
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={app.display_name} />
      </Appbar.Header>
      <ScrollView>
        <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <Card style={styles.card}>
            <Card.Title title="Info" />
            <Card.Content>
              <Text>OS: {app.os}</Text>
              <Text>Platform: {app.platform}</Text>
              <Text>Release Type: {app.release_type}</Text>
              <Text>Created At: {new Date(app.created_at).toDateString()}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Latest Version" />
            <Card.Content>
              <Text>Version: {latestVersion.value}</Text>
              <Text>Percentage: {latestVersion.rate.toFixed(2)} %</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Active Devices" />
            <Card.Content>
              <Text>Daily: {activeDevice.daily}</Text>
              <Text>Weekly: {activeDevice.weekly}</Text>
              <Text>Monthly: {activeDevice.monthly}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card} onPress={goModelStats}>
            <Card.Title title="Models" />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(AppScreen);

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
  },
});
