import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Appbar, Card } from "react-native-paper";
import apiClient from "../utils/ApiClient";
import { StackParamList } from "../models/ParamList";
import { dateBefore } from "../utils/DateUtils";
import { ActiveDeviceCounts, CountsResult } from "../models/ApiModels";
import ActiveDeviceChart from "../components/ActiveDeviceChart";
import VersionPieChart from "../components/VersionPieChart";

const DayRange = 14;

type Props = {
  navigation: StackNavigationProp<StackParamList, "App">;
  route: RouteProp<StackParamList, "App">;
};
const AppScreen = ({ navigation, route }: Props) => {
  const app = route.params.app;
  const [versions, setVersions] = useState<CountsResult>(undefined);
  const [activeDevices, setActiveDevices] = useState<ActiveDeviceCounts>(undefined);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    (async () => {
      const versionList = await apiClient.getVersions(app.owner.name, app.name, {
        start: dateBefore(now, DayRange),
      });
      setVersions(versionList);
    })();
  }, [now]);
  useEffect(() => {
    (async () => {
      const activeDeviceCounts = await apiClient.getActiveDeviceCounts(app.owner.name, app.name, {
        start: dateBefore(now, DayRange),
      });
      setActiveDevices(activeDeviceCounts);
    })();
  }, [now]);
  const goModelStats = useCallback(() => {
    navigation.push("GridStats", { title: "Models", type: "model", app });
  }, []);
  const goOsStats = useCallback(() => {
    navigation.push("GridStats", { title: "OS Versions", type: "os", app });
  }, []);
  const goLanguageStats = useCallback(() => {
    navigation.push("GridStats", { title: "Languages", type: "language", app });
  }, []);
  const goPlacesStats = useCallback(() => {
    navigation.push("GridStats", { title: "Places", type: "place", app });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={app.display_name} />
        <Appbar.Action icon="refresh" onPress={() => setNow(new Date())} />
      </Appbar.Header>
      <ScrollView style={{ paddingBottom: 16, flex: 1 }}>
        {activeDevices && (
          <ActiveDeviceChart style={styles.card} activeDeviceCounts={activeDevices} />
        )}

        {versions?.values?.length > 0 && (
          <VersionPieChart style={styles.card} versions={versions} />
        )}

        <Card style={styles.card} onPress={goModelStats}>
          <Card.Title title="Models" />
        </Card>

        <Card style={styles.card} onPress={goOsStats}>
          <Card.Title title="OS Versions" />
        </Card>

        <Card style={styles.card} onPress={goLanguageStats}>
          <Card.Title title="Languages" />
        </Card>

        <Card style={styles.card} onPress={goPlacesStats}>
          <Card.Title title="Places" />
        </Card>

        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
};

export default memo(AppScreen);

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    marginHorizontal: 16,
  },
});
