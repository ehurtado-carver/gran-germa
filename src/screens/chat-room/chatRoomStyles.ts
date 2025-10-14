import { StyleSheet } from "react-native";
import { theme } from "../../themeStyles";

export default StyleSheet.create({
  mensajeWrapper: {
    marginVertical: 4,
    maxWidth: "70%",
  },
  nombreUsuario: {
    fontSize: 12,
    color: "#555",
    marginBottom: 2,
  },
  mensajeContainer: {
    padding: 10,
    borderRadius: 15,
    
  },
  mensajeIzquierda: {
    backgroundColor: theme.colors.background,
    borderBottomStartRadius: 0
  },
  mensajeDerecha: {
    backgroundColor: theme.colors.button,
    borderBottomEndRadius: 0
  },
  mensajeText: {
    color: "#fff",
  },
  mensajeTextMio: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingBottom: 45,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    backgroundColor: theme.colors.background,
  },
  input: {
    flex: 1,
    color: "white",
    backgroundColor: "#646464ff",
    borderColor: theme.colors.input,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  boton: {
    marginLeft: 5,
    backgroundColor: theme.colors.button,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 100,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 35,
    overflow: "hidden",
    marginRight: 14,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});