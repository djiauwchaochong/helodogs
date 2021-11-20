import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Linking } from 'react-native';
import Constants from 'expo-constants';
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from "../store/action"
import Carousel from "react-native-snap-carousel";

export default function Home() {
  const { data, error, loading } = useSelector((state) => state.dataReducer)
  const [ text, setText ] = useState('')
  var dispatch = useDispatch()

  const [activeIndex, setActiveIndex] = useState(0);
  let carousel = useRef();

  function submitFilter() {
    dispatch(fetchData(text))
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }  

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  if (loading === true) {
    return (
      <View style={{
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#C2FFF9',
        flex: 1
      }}>
        <StatusBar
          animated={true}
          backgroundColor="#71DFE7"
        />
        <View style={{
          backgroundColor: '#71DFE7',
          paddingTop: 25,
          paddingBottom: 10
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 50,
            fontWeight: '700'
          }}>Hello Dog</Text>
        </View>
        <Text style={{
            textAlign: 'center',
            fontSize: 30,
            marginTop: 25,
            color: '#009DAE',
            marginTop: 25
          }}>Loading, Please wait...</Text>
      </View>
    )
  }

  if (error === true) {
    return (
      <View style={{
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#C2FFF9',
        flex: 1
      }}>
        <StatusBar
          animated={true}
          backgroundColor="#71DFE7"
        />
        <View style={{
          backgroundColor: '#71DFE7',
          paddingTop: 25,
          paddingBottom: 10
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 50,
            fontWeight: '700'
          }}>Hello Dog</Text>
        </View>
        <Text style={{
            textAlign: 'center',
            fontSize: 20,
            marginTop: 25,
            color: '#009DAE',
            marginTop: 25
          }}>Error</Text>
      </View>
    )
  }

  let _renderItemData = ({ item, index }) => {
    return (
        <View style={{
          marginTop: 25,
          backgroundColor: '#FFE652',
          borderRadius: 50
        }}>
          <Image source={{
            uri: item.images[0]
          }}
          style={{ width: "100%", height: 200, borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          />
          <Text style={{
            textAlign: 'center',
            fontSize: 15,
            padding: 10,
            fontWeight: '700'
          }}>{capitalizeFirstLetter(item.breed)}</Text>
          <Text style={{
              textAlign: 'center',
              marginBottom: 5
            }}>
              Sub Breed :
            </Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginHorizontal: 20,
            marginBottom: 20
          }}>

            {
              item.subbreed.map((el, idx) => {
                return (
                  <Text key={idx} style={{
                    fontStyle: 'italic',
                    padding: 5,
                    backgroundColor: '#C2FFF9',
                    borderRadius: 100,
                    marginHorizontal: 5
                  }}>{capitalizeFirstLetter(el)}</Text>
                )
              })
            }
            
          </View>
        </View>
      )
  }

  return (
      <View style={{
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#C2FFF9',
        flex: 1
      }}>
        <StatusBar
          animated={true}
          backgroundColor="#71DFE7"
          />
        <View style={{
          backgroundColor: '#71DFE7',
          paddingTop: 25,
          paddingBottom: 10
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 50,
            fontWeight: '700'
          }}>Hello Dog</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 50,
          marginHorizontal: 25,
          marginBottom: 25
        }}>
          <TextInput
            value={text}
            onChangeText={text => {
              setText(text)
            }}
            style={{
              height: 40,
              borderWidth: 1,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              textAlign: 'center',
              borderColor: '#009DAE',
              width: 250
            }}
          /><TouchableOpacity 
            onPress={submitFilter}
            style={{
              borderTopRightRadius: 25,
              height: 40,
              borderWidth: 1,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: '#009DAE',
              borderColor: '#71DFE7',
              width: 75,
              justifyContent: 'center'
            }}>
              <Text style={{
                textAlign: 'center',
                fontWeight: '700'
              }}>Search</Text>
          </TouchableOpacity>
        </View>
        <Carousel
          layout={"default"}
          ref={(ref) => (carousel = ref)}
          data={data}
          sliderWidth={400}
          itemWidth={300}
          renderItem={_renderItemData}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
        <View style={{
          flex: 0.5,
          backgroundColor: '#009DAE'
        }}>
          <Text style={{
            color: 'white',
            textAlign: 'center',
            paddingTop: 20,
            fontSize: 20
          }}>
            Farandi Angesti's Project
          </Text>
          <Text style={{
            color: '#FFE652',
            textAlign: 'center',
            paddingTop: 5,
            fontSize: 10
          }} onPress={() => Linking.openURL('https://github.com/djiauwchaochong/helodogs')}>
            Click here to open my Github
          </Text>
        </View>
      </View>
  );
}