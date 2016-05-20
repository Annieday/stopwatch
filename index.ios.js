var formatTime = require('minutes-seconds-milliseconds');
var React = require('react-native');
var {
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    AppRegistry,
    StyleSheet,
} = React;

var StopWatch = React.createClass({
    //initial state value
    //no logic here
    getInitialState: function(){
        return {
            timeElapsed: 0,
            startTime: null,
            running: false,
            laps: [],
        }
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={[styles.header]}>
                    <View style={[styles.timerWrapper]}>
                        <Text style={styles.timer}>
                            {formatTime(this.state.timeElapsed)}
                        </Text>
                    </View>
                    <View style={[styles.buttonWrapper]}>
                        {this.startPauseButton()}
                        {this.lapResetButton()}
                    </View>
                </View>
                <ScrollView style={[styles.footer]}>
                    {this.laps()}
                </ScrollView>
            </View>
        )
    },
    startPauseButton: function() {
        var style = this.state.running ? styles.pauseButton : styles.startButton;
        return (
            <TouchableHighlight
                onPress={this.handleStartPress}
                underlayColor="gray"
                style={[styles.button, style]}
                >
                <Text>
                    {this.state.running ? 'Pause' : 'Start'}
                </Text>
            </TouchableHighlight>
        )
    },
    lapResetButton: function() {
        var style = this.state.running ? styles.lapButton : styles.resetButton;
        return (
            <TouchableHighlight
                onPress={this.handleLapPress}
                underlayColor="gray"
                style={[styles.button, style]}
                >
                <Text>
                    {this.state.running ? 'Lap' : 'Reset'}
                </Text>
            </TouchableHighlight>
        )
    },
    handleStartPress: function() {
        if(this.state.running) {
            clearInterval(this.interval);
            this.setState({
                running: false
            });
            return
        }


        this.setState({
            startTime: new Date() - this.state.timeElapsed,
        });

        // Never update state with this.state =XXXX
        // this.state.timeElapsed = new Date() - startTime
        // we can get state by using: this.state.timeElapsed
        // Update our state with some new value
        // Always update with setState

        this.interval = setInterval(() => {
            //this function will be fired every 30 millisecond
            this.setState({// everytime setState, render will be called
                timeElapsed: new Date() - this.state.startTime,
                running: true
            });
        }, 30); // second parameter means millisecond.
    },
    handleLapPress: function() {
        if(this.state.running) {
            var lap = this.state.timeElapsed;

            this.setState({
                laps: this.state.laps.concat([lap]),
            });
        } else {
            this.setState({
                laps: [],
                timeElapsed: 0,
            });
        }
    },
    laps: function(){
        return this.state.laps.map(function(time, index) {
            return(
                <View style={styles.lap} key={index}>
                    <Text style={styles.lapText}>
                        Lap {index + 1}
                    </Text>
                    <Text style={styles.lapText}>
                        {formatTime(time)}
                    </Text>
                </View>
            )
        });
    },
    border: function(color) {
        return {
            borderColor: color,
            borderWidth: 4,
        }
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1, // Fille the entire screen
        alignItems: 'stretch',
    },
    header: { // Yellow
        flex: 1,
    },
    footer: { // Blue
        flex: 1,
    },
    timerWrapper: { // Red
        flex: 5, // takes up 5/8ths
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: { // Green
        flex: 3, // takes up 3/8ths
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    timer: {
        fontSize: 60,
    },
    button: {
        borderWidth: 2,
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButton: {
        borderColor: '#00CC00',
    },
    pauseButton: {
        borderColor: '#CC0000',
    },
    lapButton: {
        borderColor: '#0000CC',
    },
    resetButton: {
        borderColor: '#000000',
    },
    lap: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    lapText: {
        fontSize: 30,
        alignSelf: 'flex-start',
    }
});
AppRegistry.registerComponent('stopwatch', () => StopWatch);
