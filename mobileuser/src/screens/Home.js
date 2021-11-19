import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
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

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  if (loading === true) {
    return (
      <Text>LOADING BOSS</Text>
    )
  }

  if (error === true) {
    return (
      <Text>ERROR BOSS</Text>
    )
  }

  let _renderItemData = ({ item, index }) => {
    return (
        <View>
          <Text>{item.breed}</Text>
          {
            item.subbreed.map((el, idx) => {
              return (
                <Text key={idx}>{el}</Text>
              )
            })
          }
          <Image source={{
            uri: item.images[0],
          }}
          style={{ width: "100%", height: 200 }}
          />
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
            fontSize: 25
          }}>Hello Dog</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 25,
          marginHorizontal: 25
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
                textAlign: 'center'
              }}>Search</Text>
          </TouchableOpacity>
        </View>
        <Carousel
          layout={"default"}
          ref={(ref) => (carousel = ref)}
          data={data}
          sliderWidth={500}
          itemWidth={250}
          renderItem={_renderItemData}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
  );
}