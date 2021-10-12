import React from 'react';
import { Text, Image, Button, View, SafeAreaView, 
  TouchableOpacity, Dimensions, TouchableHighlight } from 'react-native';
import Icon from './src/components/Icon/Icon';
import ViewAnim from './src/components/ViewAnim/ViewAnim';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      menuIndex: 0,
    };
  }
  
  clickMenu(menuIndex)
  {
    this.setState({menuIndex})
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const from = {x: 0};
    const to = {x: windowWidth / 3 * this.state.menuIndex};

    //return <Icon name="*" size={36} />;
    return <SafeAreaView style={{ flex: 1, marginTop: 10}}>
      
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => { this.clickMenu(0); }} style={{ flex: 1, height: 50, alignContent: "center", alignItems: "center"}}>
            <Icon name="magic" size={36} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.clickMenu(1); }} style={{ flex: 1, height: 50, alignContent: "center", alignItems: "center"}}>
            <Icon name="user" size={36} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.clickMenu(2); }} style={{ flex: 1, height: 50, alignContent: "center", alignItems: "center"}}>
            <Icon name="cog" size={36} />
          </TouchableOpacity>
        </View>
        <ViewAnim
          style={{width: windowWidth / 3, height: 6, backgroundColor: "grey", borderRadius: 6}}
          from={from}
          to={to}
          duration={200}
          easing={ViewAnim.Easing.Cubic.InOut}
          repeat={1}
        />
        
        <TouchableHighlight onPress={() => { this.setState({iconVibrate: !this.state.iconVibrate}); }}
          style={{
            flexDirection: "row",
            height: 32,
            alignContent: "center",
            alignItems: "center",
            justifyContent: 'center',
            borderRadius: 8,
            marginTop: 10,
            backgroundColor: "black",
            alignSelf: 'flex-start',
            paddingLeft: 18,
            paddingRight: 18
          }}>
            <React.Fragment>
              <ViewAnim
                from={{x: 0}}
                to={{x: 6}}
                duration={1000}
                easing={ViewAnim.Easing.Vibrate.Repeat20}
                repeat={1}
                toggle={this.state.iconVibrate}
                trigger="toggle"
                resetOnStart={true}
              >
                <Icon name="magic" size={16} color="white" />
              </ViewAnim>
              <Text style={{ marginLeft: 8, color: "white"}}>Do the magic</Text>
          </React.Fragment>
        </TouchableHighlight>
        
        <TouchableHighlight
          style={{
            flexDirection: "row",
            height: 32,
            alignContent: "center",
            alignItems: "center",
            justifyContent: 'center',
            borderRadius: 8,
            marginTop: 10,
            backgroundColor: "black",
            alignSelf: 'flex-start',
            paddingLeft: 18,
            paddingRight: 18
          }}>
            <React.Fragment>
              <ViewAnim
                from={{rotate: 0}}
                to={{rotate: 360}}
                easing={ViewAnim.Easing.Linear.None}
                duration={1000}
                repeat={-1}
              >
                <Icon name="spinner" size={16} color="white" />
              </ViewAnim>
              <Text style={{ marginLeft: 8, color: "white"}}>Loading ...</Text>
          </React.Fragment>
        </TouchableHighlight>
          
        <ViewAnim
          from={{y: 0}}
          to={{y: -4}}
          duration={100}
          easing={ViewAnim.Easing.Vibrate.Once}
          repeat={1}
          toggle={this.state.buttonPunch}
          trigger="toggle"
          resetOnStart={true}
          >
          <TouchableHighlight onPress={() => { this.setState({buttonPunch: !this.state.buttonPunch}); }}
            style={{
              flexDirection: "row",
              height: 32,
              alignContent: "center",
              alignItems: "center",
              justifyContent: 'center',
              borderRadius: 8,
              marginTop: 10,
              backgroundColor: "black",
              alignSelf: 'flex-start',
              paddingLeft: 18,
              paddingRight: 18,
            }}>
            <React.Fragment>
              <Icon name="hand-peace-o" size={16} color="white" />
              <Text style={{ marginLeft: 8, color: "white"}}>Punch</Text>
            </React.Fragment>
          </TouchableHighlight>
        </ViewAnim>

        <ViewAnim
          from={{x: 0}}
          to={{x: 500}}
          duration={600}
          easing={ViewAnim.Easing.Back.In}
          repeat={1}
          toggle={this.state.buttonRocket}
          trigger="toggle"
            >
          <TouchableHighlight onPress={() => { this.setState({buttonRocket: !this.state.buttonRocket}); }}
            style={{
              flexDirection: "row",
              height: 32,
              alignContent: "center",
              alignItems: "center",
              justifyContent: 'center',
              borderRadius: 8,
              marginTop: 10,
              backgroundColor: "black",
              alignSelf: 'flex-start',
              paddingLeft: 18,
              paddingRight: 18,
            }}>
            <React.Fragment>
              <Icon name="rocket" size={16} color="white" />
              <Text style={{ marginLeft: 8, color: "white"}}>Exit</Text>
            </React.Fragment>
          </TouchableHighlight>
        </ViewAnim>

        <ViewAnim
          from={{rotate: 0}}
          to={{rotate: 360}}
          duration={2000}
          easing={ViewAnim.Easing.Elastic.Out}
          repeat={1}
          toggle={this.state.buttonBarrel}
          trigger="toggle"
          style={{ width: 150 }}
          resetOnStart={true}
        >
          <TouchableHighlight onPress={() => { console.log('barrel'); this.setState({buttonBarrel: !this.state.buttonBarrel}); }}
            style={{
              flexDirection: "row",
              height: 32,
              alignContent: "center",
              alignItems: "center",
              justifyContent: 'center',
              borderRadius: 8,
              marginTop: 10,
              backgroundColor: "black",
              alignSelf: 'flex-start',
              paddingLeft: 18,
              paddingRight: 18,
            }}>
            <React.Fragment>
              <Icon name="arrows-cw" size={16} color="white" />
              <Text style={{ marginLeft: 8, color: "white"}}>Do a barrel roll</Text>
            </React.Fragment>
          </TouchableHighlight>
        </ViewAnim>
          
      </SafeAreaView>;
  }
}

export default App;