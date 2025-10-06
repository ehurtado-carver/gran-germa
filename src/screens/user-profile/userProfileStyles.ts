import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
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
  },
  statsContainer: {
    width: "100%",
    marginTop: 20,
  },
  statBox: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    alignItems: "center",
  },
  statTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  counterText: {
    marginTop: 5,
    fontSize: 14,
    color: "red",
  },
});