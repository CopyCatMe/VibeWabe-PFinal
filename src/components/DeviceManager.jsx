import React, { Component } from "react";

class DeviceManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 768,  // Verifica si es móvil
      isOpen: true,  // Estado del menú
    };
  }

  // Función para manejar el cambio de tamaño de la ventana
  handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    this.setState({
      isMobile,
      isOpen: isMobile ? true : this.state.isOpen,  // Si es móvil, mantén el menú abierto
    });
  };

  // Añadimos el evento resize cuando el componente se monta
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  // Limpiamos el evento resize cuando el componente se desmonta
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const { isMobile, isOpen } = this.state;
    const { children } = this.props;

    return React.cloneElement(children, {
      isMobile,
      isOpen,
      toggleOpen: this.toggleOpen,
    });
  }
}

export default DeviceManager;
