import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    background: "#404040",
    card: "rgba(255,255,255,0.1)",
    primaryText: "#FFCD9E",
    secondaryText: "#D1D5DB",
    input: "#FBF1E4",
    button: "#FCAF6B",
    buttonEnd: "#22D3EE",
    border: "#FFFFFF40",
  },
};

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  textPrimary: {
    color: theme.colors.primaryText,
    fontSize: 16,
    fontWeight: "600",
  },
  textSecondary: {
    color: theme.colors.secondaryText,
    fontSize: 14,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
