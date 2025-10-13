import { StyleSheet } from "react-native";
import { theme } from "../../themeStyles";

export default StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: theme.colors.background, minWidth: "100%" },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#ffff"
  },
  statsContainer: {
    width: "100%",
    marginTop: 20,
  },
  statBox: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#ffffff56",
    borderColor: "#ffffffff",
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
  },
  statTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#ffff"
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000ff",
  },
  counterText: {
    marginTop: 5,
    fontSize: 14,
    color: "#a50a01ff",
  },
  logoutButton: {
    backgroundColor: "#a50a01ff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});