import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CreditCardInput } from 'react-native-credit-card-input'
import { saveTarjetas, getTarjetas } from '@storage/CreditCardAsyncStorage'
import Snackbar from 'react-native-snackbar'

export default function PaymentMethodDetailScreen (props) {

const [newCard, setnewCard] = useState({})
const [arrayCard, setarrayCard] = useState([])
  function onChange (formData) {

    console.log(JSON.stringify(formData, null, " "))
    setnewCard({data: formData.values,
    bolTarjeta: formData.valid})
  }

 const  onFocus = (field) => console.log("focus", field)

 function asociarTarjeta ()  {

    if(newCard.bolTarjeta){
      const result = [
        ...arrayCard.tarjetas,
        newCard.data
      ]
  
      setarrayCard({tarjetas: result}, () => {
        saveTarjetas(result).then((res) => {
            Snackbar.show({
                text: 'Tarjeta asociada',
                duration: Snackbar.LENGTH_LONG,
              })
        })
      })
    }else{
        Snackbar.show({
            text: 'Debe Llenar todos los campos',
            duration: Snackbar.LENGTH_LONG,
          })
      console.log("Debe Llenar todos los campos")
    }
  }

  useEffect(() => {
    getTarjetas().then((res) => {
        if(res != null){
            setarrayCard({tarjetas: res})
        }
        console.log(res)
      })
  }, [])
   
  


    return (
      <View style={{ flex: 1, alignItems: 'center', }}>
        <View style={{ width: '100%', height: '30%', marginTop: 60 }}>
          <CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            cardScale={0.9}
            allowScroll={true}
            labelStyle={styles.label}
            inputStyle={styles.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            placeholders={{ number: "1234 5678 1234 5678", name: "NOMBRE COMPLETO", expiry: "MM/YY", cvc: "CVC" }}
            labels={{ number: "NÚMERO TARJETA", expiry: "EXPIRA", name: "NOMBRE COMPLETO", cvc: "CVC/CCV" }}
            onFocus={onFocus}
            onChange={onChange}
          />
        </View>
        <View style={{
          width: 280,
          marginTop: 40,
          marginBottom: 20,
          backgroundColor: '#B71C1C',
          borderRadius: 60
        }}>
          <TouchableOpacity onPress={()=> asociarTarjeta()}>
            <Text style={{
              textAlign: 'center',
              fontSize: 17,
              color: 'white',
              paddingVertical: 15,
            }}>Asociar Tarjeta</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  
}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});