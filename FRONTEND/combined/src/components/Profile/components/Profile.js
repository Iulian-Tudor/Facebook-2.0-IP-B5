import React, { useState, useEffect } from "react";
import "./Profile.css"
import "./Feed.css"
import EditProfile from "./EditProfile";
import Popup from "./Popup";
import StretchedMenu from './stretched_menu.js';
import likeBtn from './icons/like.svg'
import commentBtn from './icons/comment.svg'
import shareBtn from './icons/share.svg'
import editButton from './icons/edit-pen.svg'
import icon5 from './icons/search.svg';
import icon6 from './icons/notif.svg';
import icon7 from './icons/out.svg';
import { getUserOther, getUserPosts, getFriends, addFriend, getFriendRequests, getFriendRequestsSend, getImage,getUser } from "../../../util";
import Feed from '../../HomePage/components/homepageComponents/Feed';
import { Link } from "react-router-dom";
// import TopBar from '../../HomePage/components/TopBar'
const SERVER_ADDRESS = 'http://localhost:8084';

async function getRaw(url, method = 'POST', body = null) {
  const options = {
    method,
    credentials: 'include', // include cookies in the request
    body
  };
  const res = await fetch(url, options);
  return res;
}

async function getData(url, method = 'POST', body = null) {
  const res = await getRaw(url, method, body);
  const data = await res.json();
  return data;
}


async function getSuggestions() {
  const url = new URL(SERVER_ADDRESS + '/suggestions?count=10');
  return await getData(url, 'GET');
}

async function getUsers(){
  return await getData(SERVER_ADDRESS+`/users`,'GET');
}

const commentp2 = [
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." },
  { account: { name: 'Andrew Tate', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, comment: "The Matrix may have imprisoned me, But I am free inside The Real World." }
];

const posts = [
  { account: { name: 'Dwayne Johnson', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '02.01.2023' }, text: 'Made my historic rap debut (thankfully I didn’t suck😅) Huge shout to all the hip hop & music fans for your HYPE reactions that are straight f*cking fire 🔥🔥🔥🙏🏾👊🏾', picture: null, video: 'https://www.youtube.com/embed/E9T78bT26sk', comments: commentp2, link: null },
  { account: { name: 'Dwayne Johnson', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '30.02.2023' }, text: 'A lot of blood, sweat, and tears have gone into this career of mine.', picture: require('./img/kevin-hart-feed.jpg'), video: null, comments: commentp2, link: null },
  { account: { name: 'Dwayne Johnson', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '21.01.2023' }, text: 'The Matrix may have imprisoned me, But I am free inside The Real World.', picture: require('./img/free-tate.jpg'), video: null, comments: commentp2, link: null },
  { account: { name: 'Dwayne Johnson', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '24.03.2023' }, text: '@ryanReynolds is my best friend :3', picture: null, video: null, comments: commentp2, link: null },
  { account: { name: 'Dwayne Johnson', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '14.03.2023' }, text: 'I’m not homophobic, I enjoy watching lesbians on the internet.', picture: require('./img/jk.jpg'), video: null, comments: commentp2, link: null }
];

const myFriends = [
  { account: { name: 'Dwayne Johnson', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '02.01.2023' } },
  { account: { name: 'Dwayne Johnson', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '02.01.2023' } },
  { account: { name: 'Dwayne Johnson', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '02.01.2023' } },
  { account: { name: 'Dwayne Johnson', picture: require('./img/dwayne-johnson.jpg'), uploadDate: '02.01.2023' } }
];

function Feed_account() {
  const feedAccounts = posts.map(post =>
    <Card account={post.account} text={post.text} pictures={post.picture} video={post.video} />
  );
  return (
    <div className='feed'>
      {feedAccounts}
    </div>
  );
}


// async function getPosts() {
//   const posts = await getRecommendedPosts();


//   const content = [...posts, ...ads.map(adToPostConvert)].sort(() => Math.random() < 0.5 ? 1 : -1);
//   return content;
// }

function Card({ account: { name, picture, uploadDate }, text, pictures, video }) {
  return (
    <div className='card'>
      <div className='topCard'>
        <Account name={name} picture={picture} uploadDate={uploadDate} />
        <div className='options'>
          {/* <p>dsfsdf</p> */}
        </div>
      </div>

      <div className='postBody'>
        {text.length > 0 &&
          <p>{text}</p>
        }

        {pictures != undefined &&
          <img src={pictures} alt={name} />
        }

        {video != undefined &&

          <div>
            <iframe id="ytplayer" type="text/html" src={video} frameborder="0"></iframe>
          </div>
        }

      </div>

      <div className='bottomCard'>
        <div className='likes'>
          <img src={likeBtn} width='20px' alt='like button' />
          <p>69</p>
        </div>

        <div className='comments'>
          <img src={commentBtn} width='20px' alt='like button' />
          <p>69</p>
        </div>

        <div className='shares'>
          <img src={shareBtn} width='20px' alt='like button' />
          <p>69</p>
        </div>
      </div>
    </div>
  );
}

function Account({ name, picture, uploadDate }) {
  return (
    <div className='account'>
      <img src={picture} alt={name} />
      <div className='accountDetails'>
        <p className='name'>{name}</p>
        <p className='date'>{uploadDate}</p>
      </div>
    </div>
  );
}

function Description({ descriptionText, setDescriptionText }) {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className="profile_left-content-profile">
      <div className="profile_profile-info">
        <h2 className="profile_descriptionTitle">Description</h2>
        <p>{descriptionText}</p>
      </div>
      <Popup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        descriptionText={descriptionText}
        setDescriptionText={setDescriptionText}
      >
        <h3>Edit description</h3>
      </Popup>
    </div>
  );
}

async function areFriends(profileUserId) {
  const friends = await getFriends();
  const friendIds = friends.map(friend => friend.id);
  return friends.some(friend => friend.id.toString() === profileUserId.toString());
}
function EditProfileFCT({ nameText, setNameText, imageUrl, setImageUrl }) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestGet, setRequestGet] = useState(false);
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");

  useEffect(() => {
    areFriends(id).then(result => {
      setIsFriend(result);
    });

    getFriendRequests().then((friendRequests) => {
      if (friendRequests) {
        const isSender = friendRequests.some(request => {
          if (request.sender.id && id) {
            return request.sender.id.toString() === id.toString();
          }
          return false;
        });
        if (isSender) {
          setRequestGet(true);
        }
      }
    });


    getFriendRequestsSend().then((friendRequests) => {
      if (friendRequests) {
        const isRec = friendRequests.some(request => {
          if (request.receiver.id && id) {
            return request.receiver.id.toString() === id.toString();
          }
          return false;
        });
        if (isRec) {
          setRequestSent(true);
        }
      }
    });
  }, [id]);

  function handleAddFriend() {
    addFriend(id);
    setRequestSent(true);
    setIsFriend('requestSent');
  }


  return (
    <div className="profile_buttons-name">
      <div className="profile_profile-info">
        <h2 className="profile_name">{nameText}</h2>
      </div>
      <div>
        {!isFriend && !requestGet && !requestSent && (
          <button className="profile_add-friend" onClick={handleAddFriend}>
            Add Friend
          </button>
        )}
      </div>
      {/* <EditProfile
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        nameText={nameText}
        setNameText={setNameText}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      >
      </EditProfile> */}
    </div>
  );
}

const Profile = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);
 const [existingUsers,setExistingUsers] = useState([]);
useEffect(() => {
getUsers().then( 
    users => {
        setExistingUsers(users);
      });
      
}, []);


  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);

    const filtered = existingUsers.filter((friend) =>
      (friend.firstName+" "+friend.lastName).toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFriends(filtered);
  };

function handleClickSearchedUser(userId) {
    //alert("Ar trebui sa te duca la profilul persoanei " + userName)
    
      getUser()
        .then(data => {
          if(data.id.toString()==userId.toString())
            window.location.href = "http://localhost:3000/myProfile";
          else
            window.location.href = "http://localhost:3000/profile?id=" + userId;});
          

 }
  const [modal, setModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [profileImage, setProfileImage] = useState(null);

  // useEffect(() => {
  //   getUserOther(id)
  //     .then(data => {
  //       setUserData(data);
  //      setUserId(data.id);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user data:', error);
  //     });

  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserOther(id);
        const img = await getImage(data.profile_picture);
        const base64Image = 'data:image/png;base64,' + img;
        setProfileImage(base64Image);
        data.profile_picture = base64Image;
        setUserData(data);
        setUserId(data.id);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    if (userId && !posts.length) {
      getFeedContent(userId)
        .then(posts => {
          const updatedPosts = posts.map(post => ({
            ...post,
            user: {
              ...post.user,
              profile_picture: userData.profile_picture
            }
          }));
          setPosts(updatedPosts);
        });
    }
  }, [userId, userData]);

  async function getFeedContent(userId) {

    const posts = await getUserPosts(userId);
    const content = [...posts];
    return content;
  }

  useEffect(() => {
    const fullName = `${userData.firstName} ${userData.lastName}`;
    setName(fullName);
  }, [userData]);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (userData.bio) {
      setDescription(userData.bio);
    }
    else {
      setDescription("This is my description.");
    }
  }, [userData]);

  const togglePosts = () => {
    setModal(!modal);
    setShowComments(!showComments);
  }

  const toggleFriends = () => {
    setModal(!modal);
    setShowComments(false);
    setShowFriends(!showFriends);
  }



  const handleNameUpdate = (newName) => {
    setName(newName);
  };

  const handleImageUpdate = (newImageUrl) => {
    setImageUrl(newImageUrl);
  };

  return (
    <>
      <div className={modal ? 'feed_modal' : null}></div>
      <div className='profile_container-profile'>
        <div className="profile_left-profile">
          <StretchedMenu />
        </div>
        <div className="profile_right-profile">
          <div className="profile_top-bar">
            <div className="profile_search-profile">
              <div className={searchText !== '' && filteredFriends!==null ?"feed_search_box_activ":"feed_search_box"}>
                <img src={icon5}></img>
                <input type="text" className="feed_search_box_input " value={searchText} onChange={handleSearch} placeholder="Search users..."/>
            {searchText !== '' && (
            <ul className="feed_friend-list">
        {filteredFriends.map((friend, index) => (
          <li key={index} className={index === 0 ? 'feed_first-friend' : ''} onClick={()=>handleClickSearchedUser(friend.id)} style={{ cursor: 'pointer' }}>{friend.firstName+" "+friend.lastName}</li>
        ))}
      </ul> 
  )}
              </div>
              <div className="profile_right_icons-profile">
          <Link to='/login'>
                <img src={icon7}></img>
                </Link>
              </div>
            </div>
          </div>

          <div className="profile_content-profile">
            <div className="profile_upper-profile">
              <div className="profile_colored-cover">
                <img id="profile-photo" className="profile_profile-photo" src={userData.profile_picture} />
              </div>
              <div className="profile_white-cover">
                <div className="profile_photo-name-profile">
                  <EditProfileFCT nameText={name} setNameText={handleNameUpdate} setImageUrl={handleImageUpdate} />
                </div>
              </div>
            </div>
            <div className="profile_bottom-profile">
              <Description descriptionText={description} />

              <div className="profile_right-content-profile">
                {/* <Feed_account /> */}
                <Feed posts={posts} togglePosts={togglePosts} showComments={showComments} showFriends={showFriends} toggleFriends={toggleFriends} friends={myFriends} useCase={'profile'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile
