import { StyleSheet } from "react-native";
import { theme } from "../../themeStyles";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },

  // Sección superior
  topSection: {
    flexDirection: "row",
    width: "100%",
    height: 180,
    alignItems: "stretch",
  },
  leftSection: {
    flex: 1,
    backgroundColor: "#d3a074ff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderBottomEndRadius: 5
  },
  rightSection: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  username: {
    marginTop: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  infoText: { color: theme.colors.input, fontSize: 15, marginVertical: 4 },
  infoTextResult: { color: theme.colors.button, fontSize: 15, marginVertical: 4, paddingLeft: 20 },

  // Estadísticas
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
  },
  statCard: {
    backgroundColor: theme.colors.button,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: "28%",
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000ff",
  },
  statLabel: { 
    color: "#000000ff", 
    marginTop: 4, 
    fontSize: 14,
  },

  // Sección inferior
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.button,
    borderRadius: 16,
  },
  groupCircle: {
    alignItems: "center",
    marginVertical: 55,
  },
  groupCount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000000ff",
  },
  groupLabel: { fontSize: 20, color: "#000000ff", fontWeight: "bold"},
  timerContainer: {
    alignItems: "center",
  },
  timerText: { fontSize: 14, color: "#000000ff", fontWeight: "bold" },

  // Logout
  logoutContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
