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
import { ActiveDeviceCounts, VersionsResult } from "../models/ApiModels";
import ActiveDeviceChart from "../components/ActiveDeviceChart";
import VersionPieChart from "../components/VersionPieChart";

const DayRange = 14;

type Props = {
  navigation: StackNavigationProp<StackParamList, "App">;
  route: RouteProp<StackParamList, "App">;
};
const AppScreen = ({ navigation, route }: Props) => {
  const app = route.params.app;
  const [latestVersion, setLatestVersion] = useState({ value: "", rate: 0 });
  const [versions, setVersions] = useState<VersionsResult>(undefined);
  const [activeDevices, setActiveDevices] = useState<ActiveDeviceCounts>(undefined);
  const now = new Date();
  useEffect(() => {
    (async () => {
      const versionList = await apiClient.getVersions(
        app.owner.name,
        app.name,
        dateBefore(now, DayRange),
        dateBefore(now, 0),
      );
      setVersions(versionList);
      if (versionList?.versions?.length > 0) {
        const lastItem = versionList.versions[versionList.versions.length - 1];
        setLatestVersion({
          value: lastItem.version,
          rate: (lastItem.count / versionList.total) * 100,
        });
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const activeDeviceCounts = await apiClient.getActiveDeviceCounts(
        app.owner.name,
        app.name,
        dateBefore(now, DayRange),
        dateBefore(now, 0),
      );
      setActiveDevices(activeDeviceCounts);
    })();
  }, []);
  const goModelStats = useCallback(async () => {
    const now = new Date();
    const models = await apiClient.getModels(app.owner.name, app.name, dateBefore(now, DayRange));
    navigation.push("GridStats", {
      title: "Models",
      data: { total: models.total, values: models.models },
      labelField: "model_name",
    });
  }, []);
  const goOsStats = useCallback(async () => {
    const now = new Date();
    const oses = await apiClient.getOSes(app.owner.name, app.name, dateBefore(now, DayRange));
    navigation.push("GridStats", {
      title: "OS Versions",
      data: { total: oses.total, values: oses.oses },
      labelField: "os_name",
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={app.display_name} />
      </Appbar.Header>
      <ScrollView style={{ marginHorizontal: 16, marginBottom: 16, flex: 1 }}>
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

        {versions && <VersionPieChart versions={versions} />}

        {activeDevices && <ActiveDeviceChart activeDeviceCounts={activeDevices} />}

        <Card style={styles.card} onPress={goModelStats}>
          <Card.Title title="Models" />
        </Card>

        <Card style={styles.card} onPress={goOsStats}>
          <Card.Title title="OS Versions" />
        </Card>
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
