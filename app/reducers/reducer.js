import {GCHANGE, SCHANGE, SET_NAME, SET_BIRTHDAY, SET_NEWSOFFSET, SET_PHOTO, ADD_TO_POTENTIAL} from '../constants';
import _ from 'lodash';

const initialState = {
  profileKeys: ['key0', 'key3'], //First gender, second status
  name: 'Sibo',
  bd: new Date(),
  //newsOffset: 0,
  photoUri: null,
  personList: [],
  potentialList: [],
  selfData:
      {
          interests: [],
          class: 0,
          major: [],
          numLiveWith: 0,
          preferArea: [],
          priceRange: [0,0],
          smoke: false,
          pet: false,
          ownCar: false,
          likeParty: false,
          single: false,
          visibleToOppositeGender:false,
          completed:false,
        },
  preference:{
          viewSameGenderOnly: true,
          interests: ['Basketball','Game'],
          class: 2018,
          major: ['Biology'],
          numLiveWith: 2,
          preferArea: ['Allston', 'Brookline'],
          priceRange: [1400,1600],
          smoke: false,
          pet: false,
          alcohol:false,
          likeParty: true,
          gaming: true,
          single: true,
          ownCar: true,
          topThreePriority: ['class', 'interests', 'preferArea'],
        }
};

function reducer(state = initialState, action){
  let newState = Object.assign({}, state);
  const {type, payload} = action

  switch (type) {
    case GCHANGE: {
      newState.profileKeys[0] = payload
      break;
    }
    case SCHANGE: {
      newState.profileKeys[1] = payload
      break;
    }
    case SET_NAME: {
      newState.name = payload
      break;
    }
    case SET_BIRTHDAY: {
      newState.bd = payload
      break;
    }
    case SET_PHOTO: {
      newState.photoUri = payload
      break;
    }

    // This is for roommate DeckSwipe
    case ADD_TO_POTENTIAL: {
      if (!_.includes(newState.potentialList, payload)){
        newState.potentialList.push(payload)
      }
      break;
    }

    // Roommate preference Selection.


  }
  console.log("General new State ===> ", newState)
  return newState
};

export default reducer;
