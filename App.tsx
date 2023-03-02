/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{ useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button, TextInput 
} from 'react-native';



import ThermalPrinterModule from 'react-native-thermal-printer';
import TcpSocket from 'react-native-tcp-socket';

ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  ip: '192.168.1.14',
  port: 9100,
  timeout: 30000,
};


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [state, setState] = useState({
  
    text: 
    'kamal Raaj'
   // "[C]<img>data:image/png;base64,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</img>"
  
  });

  const backgroundStyle = {
//    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPress = async () => {
    try {
      console.log('We will invoke ');
      console.log(state.text);
    //   const options = {
    //     port: 9100,
    //     host: "192.168.0.114", //give your IP address
    //     tls: true,
    // };
    
    // // Create socket
    // const client = TcpSocket.createConnection(options, () => {
    //   // Write on the socket
    //  client.write('Hello server!');
    // // client.
    //   // Close socket
    //  client.destroy();
    // });
  // ThermalPrinterModule.printTcp({ payload: state.text });
//ThermalPrinterModule.printBluetooth({ payload: state.text }); 
     

//       console.log('done printing');




ThermalPrinterModule.printTcp({
  ip: '192.168.1.14',
  port: 9100,
  timeout: 30000,
  payload:
    "[C]<u><font size='big'>" +
    'Test success !' +
    '</font></u>\n' +
    '[L] \n' +
    '[L] \n',
 
});

// await ThermalPrinterModule.printBluetooth({
//   payload: 'hello world',
//   printerNbrCharactersPerLine: 38,
// });




    } catch (err) {
  
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
   <View style={{}}>
 
    </View>
      <TextInput
        value={state.text}
        onChangeText={(text) => setState((prev) => ({ ...prev, text }))}
      />
      <Button
        title="Print"
        color="#841584"
        onPress={onPress}
      />
    </SafeAreaView>
  );
};



export default App;
