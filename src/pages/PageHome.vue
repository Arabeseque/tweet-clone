<template>
<q-page class="relative-position">
<q-scroll-area class="absolute fullscreen" >
<div class="q-py-md q-px-md row" >
  <div class="col">
    <q-input class="tInput" bottom-slots v-model="newTweetContent" label="What's happening?" counter maxlength="280" autogrow >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://avatars.githubusercontent.com/u/75929064?s=400&u=e562f2805c2a89fb6eba4791604c296ef5d4b7c7&v=4">
          </q-avatar>
        </template>
    </q-input>
  </div>
  <div class="col col-shrink self-end tbutton">
    <q-btn unelevated rounded color="primary" label="Tweet" no-caps :disable="!newTweetContent" @click="addTweet()"/>
  </div>
</div>
<q-separator class="tSeparator" size="18px" color="grey-2" />

<transition-group
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <q-item class="q-pt-md qweetItem" v-for="item in qweet" :key="item.date">
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle2">
            Brunch this weekend?
            <span class="text-grey-5">@danny__connell
            <br class="lt-md">&bull;{{formatDate(item.date)}}
            </span>
          </q-item-label>
          <q-item-label  class="text-body2 t-comment">
            {{item.qweets}}
          </q-item-label>
          <div class="row justify-between tweet-icons t-mt-md">
            <q-btn flat round color="grey-6" icon="far fa-comment" />
            <q-btn flat round color="grey-6" icon="fa-solid fa-retweet" />
            <q-btn flat round color="grey-6" icon="far fa-heart" />
            <q-btn flat round color="grey-6" icon="fa-solid fa-trash" @click="deleteTweet(item)" />
          </div>
        </q-item-section>
  </q-item>
</transition-group>
</q-scroll-area>
</q-page>

</template>

<script setup>
import { formatDistance } from 'date-fns'
import { ref, onMounted, reactive } from 'vue'
import db from 'src/boot/firebase'
import { collection, getDocs, addDoc, query, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore/lite'
// import { addDoc } from "firebase/firestore";
// Add a new document with a generated id.
// import { query, orderBy } from 'firebase/firestore'

const newTweetContent = ref('')
const qweet = reactive([])
const addTweet = async () => {
  const newTweet = {
    qweets: newTweetContent.value,
    date: Date.now()
  }
  qweet.unshift(newTweet)
  const docRef = await addDoc(collection(db, 'qweets'), {
    date: Date.now(),
    qweets: newTweetContent.value,
    id: '1'
  })
  const washingtonRef = doc(db, 'qweets', docRef.id)
  await updateDoc(washingtonRef, {
    id: docRef.id
  })
  console.log(docRef)
  console.log('Document written with ID: ', docRef.id)
  newTweetContent.value = ''
}

function formatDate (date) {
  return formatDistance(date, new Date())
}

const deleteTweet = async (item) => {
  await deleteDoc(doc(db, 'qweets', item.id))
  qweet.splice(qweet.indexOf(item), 1)
}

onMounted(() => {
  async function getCities (db) {
    const citiesCol = query(collection(db, 'qweets'), orderBy('date'))
    const citySnapshot = await getDocs(citiesCol)
    console.log(citySnapshot.data)
    const cityList = citySnapshot.docs.map(doc => doc.data())
    // console.log(cityList)
    return cityList
  }
  const result = getCities(db)

  // const p = query(result, orderBy('country'))
  // console.log(result)

  result.then(res => {
    for (let i = 0; i < res.length; i++) {
      qweet.push(res[i])
    }
  })

  // console.log(qweet)
})

</script>

<style lang="sass">
.tbutton
  padding-bottom: 25px

.tInput
  textarea
    font-size: 19px
    line-height: 1.5 !important
.tSeparator
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-3
.t-comment
  white-space: pre-line
.tweet-icons
  margin-left: -12px
.qweetItem
  border-top: 1px solid $grey-3
</style>
