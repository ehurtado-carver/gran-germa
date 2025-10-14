import { StyleSheet } from "react-native";
import { theme } from "../../themeStyles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    marginVertical: 8,
    borderRadius: 16,
    borderColor: theme.colors.input,
    backgroundColor: theme.colors.input,
    borderWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.background,
  },
  creator: {
    fontSize: 13,
    color: theme.colors.background,
    marginTop: 10,
  },
  creatorName: {
    fontSize: 13,
    fontWeight: "bold",
    color: theme.colors.button,
    marginTop: 10,
    paddingLeft: 5
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.button,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    color: theme.colors.button,
    fontSize: 20,
  },
  expire: {
    fontSize: 12,
    color: "#e71a0fff",
    marginTop: 10,
    fontWeight: "500",
  },
  timerContainer: {
    alignItems: "center",
    paddingRight: 10
  },
  timerText: { fontSize: 8, color: "#000000ff", fontWeight: "bold" },
});
