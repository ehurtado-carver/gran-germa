import { StyleSheet } from "react-native";

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
    backgroundColor: "#dad28bff",
  },
  mensajeDerecha: {
    backgroundColor: "#007AFF",
  },
  mensajeText: {
    color: "#000",
  },
  mensajeTextMio: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  boton: {
    marginLeft: 5,
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
});