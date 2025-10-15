import { StyleSheet } from "react-native";
import { theme } from "../../themeStyles";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },

  // Sección superior
  topSection: {
    flexDirection: "column",
    width: "100%",
    alignItems: "stretch",
  },
  leftSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomEndRadius: 5
  },
  rightSection: {
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 10
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: theme.colors.button,
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.button,
    borderRadius: 100,
    padding: 4,
    borderWidth: 1,
    shadowColor: theme.colors.background,
    shadowOpacity: 0.5,
    borderColor: theme.colors.button,
  },
  username: {
    color: theme.colors.input,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 10
  },
  infoText: { color: theme.colors.input, fontSize: 10, marginVertical: 2 },

  // Estadísticas
  statsColumn: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 25,
    paddingHorizontal: 10
  },
  statCard: {
    backgroundColor: theme.colors.button,
    marginBottom: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.input,
  },
  statLabel: { 
    color: theme.colors.background, 
    fontSize: 15,
    flex: 1
  },

  // Sección inferior
  bottomSection: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: theme.colors.input,
    borderRadius: 15,
  },
  groupCircle: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupCount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000000ff",
  },
  groupLabel: { 
    fontSize: 15,
    color: theme.colors.background,
    fontWeight: "bold",
    paddingVertical: 5
  },
  timerContainer: {
    alignItems: "center",
    padding: 5
  },
  timerText: { fontSize: 14,
    color: theme.colors.background,
    fontWeight: "bold" 
  },

  // Logout
  logoutContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ff3227a2",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
