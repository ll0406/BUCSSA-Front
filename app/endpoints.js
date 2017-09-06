//Endpoints
export const BASE = 'http://bucssa.net/API/v1';

//User
export const LOGIN = '/user/account/login.php';
export const USER_AUTH = '/user/userinfo/getMyInfos.php';
export const USER_UPDATE = '/user/userinfo/zeditUserInfo.php';

//Message
export const CHECK_NEW_MESSAGELIST = '/pm/check/newByUid.php';
export const GET_MESSAGE_LIST = '/pm/chat/get.php';
export const GET_MESSAGE = '/pm/message/getByPlid.php';
export const DELETE_MESSAGE = '/pm/chat/delete.php';
export const CHECK_NEW_MESSAGE = '/pm/check/newByPlid.php';
export const GET_MESSAGE_BYOFFSET = '/pm/message/getByOffset.php';
export const REPLY = '/pm/message/reply.php';
export const SET_READ = '/pm/chat/setRead.php';
export const CREATE_MESSAGE = '/pm/chat/create.php';

//thread
export const GET_THREAD_COLLECTION = '/thread/collection/get.php';
export const ADD_THREAD_TO_COLLECTION = '/thread/collection/add.php';
export const DELETE_THREAD_FROM_COLLLECTION = '/thread/collection/delete.php';
export const GET_OFFICIAL_THREAD = '/thread/getOfficialThreads.php';

//Friends
export const GET_FRIENDSLIST = '/user/friend/getFriends.php';
export const ADD_FRIEND_REQUEST = '/user/friend/add.php';
export const DELETE_FRIEND = '/user/friend/delete.php';
