import { StyleSheet } from "react-native";
import { theme } from "../../themeStyles";

export default StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 42,
    marginTop: 200,
    marginBottom: 25,
    fontWeight: "bold",
    color: theme.colors.primaryText,
    textAlign: "center",
  },
  headRegister: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 200, 
    marginBottom: 50
  },
  titleRegister: {
    fontSize: 42,
    marginBottom: 25,
    marginTop: 25,
    fontWeight: "bold",
    color: theme.colors.primaryText,
    textAlign: "center",
  },
  input: {
    backgroundColor: theme.colors.input,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  button: {
    backgroundColor: theme.colors.button,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: "#000000ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: theme.colors.button,
    fontWeight: "bold",
    fontSize: 14,
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
  },
});
