import { StyleSheet } from "react-native";

export default StyleSheet.create({
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatSubtitle: {
    fontSize: 12,
    color: "#555",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
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
});