import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Appbar, Card, DataTable } from "react-native-paper";
import apiClient from "../utils/ApiClient";
import { StackParamList } from "../models/ParamList";
import { dateBefore } from "../utils/DateUtils";
import {
  ActiveDeviceCounts,
  CountsResult,
  EventsResult,
  SessionDurationsDistribution,
} from "../models/ApiModels";
import ActiveDeviceChart from "../components/ActiveDeviceChart";
import VersionPieChart from "../components/VersionPieChart";
import SessionDurationsDistributionChart from "../components/SessionDurationsDistributionChart";
import FilterBar from "../components/FilterBar";
import { DateRange } from "../models/Models";

type Props = {
  navigation: StackNavigationProp<StackParamList, "App">;
  route: RouteProp<StackParamList, "App">;
};
const AppScreen = ({ navigation, route }: Props) => {
  const app = route.params.app;
  const [versions, setVersions] = useState<CountsResult | undefined>(undefined);
  const [activeDevices, setActiveDevices] = useState<ActiveDeviceCounts | undefined>(undefined);
  const [eventsResult, setEventsResult] = useState<EventsResult | undefined>(undefined);
  const [durationsDistribution, setDurationsDistribution] = useState<
    SessionDurationsDistribution | undefined
  >(undefined);
  const [filteredVersion, setFilteredVersion] = useState<string | undefined>(undefined);
  const [now, setNow] = useState(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({
    start: dateBefore(now, 7),
    end: now,
  });
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const versionList = await apiClient.getVersions(app.owner.name, app.name, {
        ...dateRange,
      });
      if (isMounted) setVersions(versionList);
    })();
    return () => {
      isMounted = false;
    };
  }, [now, dateRange]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const activeDeviceCounts = await apiClient.getActiveDeviceCounts(app.owner.name, app.name, {
        ...dateRange,
        version: filteredVersion,
      });
      if (isMounted) setActiveDevices(activeDeviceCounts);
    })();
    return () => {
      isMounted = false;
    };
  }, [now, filteredVersion, dateRange]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const eventsResult = await apiClient.getEventsSummary(app.owner.name, app.name, {
        ...dateRange,
        version: filteredVersion,
      });
      if (isMounted) setEventsResult(eventsResult);
    })();
    return () => {
      isMounted = false;
    };
  }, [now, filteredVersion, dateRange]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const eventsResult = await apiClient.getSessionDurationsDistribution(
        app.owner.name,
        app.name,
        { ...dateRange, version: filteredVersion },
      );
      if (isMounted) setDurationsDistribution(eventsResult);
    })();
    return () => {
      isMounted = false;
    };
  }, [now, filteredVersion, dateRange]);

  const goModelStats = useCallback(() => {
    navigation.push("GridStats", { title: "Models", type: "model", app, dateRange });
  }, [dateRange]);
  const goOsStats = useCallback(() => {
    navigation.push("GridStats", { title: "OS Versions", type: "os", app, dateRange });
  }, [dateRange]);
  const goLanguageStats = useCallback(() => {
    navigation.push("GridStats", { title: "Languages", type: "language", app, dateRange });
  }, [dateRange]);
  const goPlacesStats = useCallback(() => {
    navigation.push("GridStats", { title: "Places", type: "place", app, dateRange });
  }, [dateRange]);
  const goDiagnostics = useCallback(() => {
    navigation.push("Diagnostics", { app, dateRange });
  }, [dateRange]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={app.display_name} />
        <Appbar.Action icon="refresh" onPress={() => setNow(new Date())} />
      </Appbar.Header>
      <View>
        <FilterBar
          versions={versions?.values?.map((x) => x.key)}
          onChangeVersion={(ver) => setFilteredVersion(ver)}
          onChangeTime={(dateRange) => setDateRange(dateRange)}
        />
      </View>
      <ScrollView style={{ paddingBottom: 16, flex: 1 }}>
        {activeDevices && (
          <ActiveDeviceChart style={styles.card} activeDeviceCounts={activeDevices} />
        )}

        {versions && versions.values?.length > 0 && !filteredVersion && (
          <VersionPieChart style={styles.card} versions={versions} />
        )}

        {durationsDistribution && durationsDistribution.distribution?.length > 0 && (
          <SessionDurationsDistributionChart
            style={styles.card}
            distribution={durationsDistribution}
          />
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

        <Card style={styles.card}>
          <Card.Title title="Events" />
          <Card.Content>
            <DataTable>
              {eventsResult?.events.map((x) => (
                <DataTable.Row
                  key={x.name}
                  onPress={() =>
                    navigation.push("EventDetails", {
                      app,
                      name: x.name,
                      dateRange,
                    })
                  }
                >
                  <DataTable.Cell>{x.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{x.count}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        <Card style={styles.card} onPress={goDiagnostics}>
          <Card.Title title="Diagnostics" />
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
