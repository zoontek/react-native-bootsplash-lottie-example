import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import Lottie from 'lottie-react-native';
import RNBootSplash from 'react-native-bootsplash';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [animationIsVisible, setAnimationIsVisible] = React.useState(true);
  const ref = React.useRef<Lottie>(null);
  const progress = React.useRef<Animated.Value>(new Animated.Value(0));
  const opacity = React.useRef<Animated.Value>(new Animated.Value(1));

  React.useEffect(() => {
    // delay to ensure animation is loaded (see https://github.com/react-native-community/lottie-react-native/issues/274)
    const unsubscribe = setTimeout(() => {
      RNBootSplash.hide({fade: false}); // hide the bootsplash immediately, without any fade

      if (!progress.current) {
        return null;
      }

      Animated.sequence([
        Animated.timing(progress.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 2500, // I speed up the animation a bit
          easing: Easing.ease,
        }),
        Animated.timing(opacity.current, {
          delay: 250,
          toValue: 0,
          useNativeDriver: true,
          duration: 250,
          easing: Easing.in(Easing.ease),
        }),
      ]).start(() => {
        setAnimationIsVisible(false);
      });
    }, 500);
    
    return () => {
      clearTimeout(unsubscribe);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={animationIsVisible ? 'light-content' : 'dark-content'}
        animated={true}
      />

      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change
                this screen and then come back to see your edits.
              </Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>

            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>

      {animationIsVisible && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: opacity.current,
            },
          ]}>
          <Lottie
            ref={ref}
            source={require('./assets/lottie_animation.json')}
            loop={false}
            progress={progress.current}
            resizeMode="contain"
            style={{height: 300, width: 300}}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
