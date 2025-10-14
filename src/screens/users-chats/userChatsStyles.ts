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
    backgroundColor: "",
    marginVertical: 8,
    padding: 14,
    borderColor: theme.colors.input,
    borderBottomWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatarContainer: {
    width: 75,
    height: 75,
    borderRadius: 35,
    borderWidth: 2,
    overflow: "hidden",
    marginRight: 14,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    color: theme.colors.button,
  },
  distance: {
    fontSize: 14,
    color: "#fcfcfcff",
    marginTop: 2,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: theme.colors.button,
    fontSize: 20,
  },
});