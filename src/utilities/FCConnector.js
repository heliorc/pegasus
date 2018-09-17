export default new class FCConnector {
  startDetect(onFcConnect) {
    let connection = new WebSocket("ws://127.0.0.1:9002");

    connection.onopen = () => {
      console.log("opened");
    };

    connection.onerror = error => {
      console.warn(error);
    };

    connection.onmessage = message => {
      let data = JSON.parse(message.data);
      onFcConnect(data);
    };
  }

  tryGetConfig() {
    return fetch("http://localhost:9001/device").then(response => {
      return response.json();
    });
  }

  setValue(name, newValue) {
    return fetch(`http://localhost:9001/set/${name}/${newValue}`).then(
      response => {
        return response.json();
      }
    );
  }

  saveConfig() {
    return fetch(`http://localhost:9001/send/save`).then(response => {
      return response.json();
    });
  }

  flashDFU(binUrl, notifyProgress) {
    return fetch(
      `http://localhost:9001/flash/${encodeURIComponent(binUrl)}`
    ).then(response => {
      return response.json();
    });
  }

  goToDFU() {
    return fetch(`http://localhost:9001/send/bl`).then(response => {
      return response.json();
    });
  }
}();
