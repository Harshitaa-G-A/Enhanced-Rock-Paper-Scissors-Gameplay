import { useState, useEffect } from 'react';
import './avatar.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const AvatarPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { state } = location;
  const { loggedInUser } = state || {};
  
  useEffect(() => {
    
    const prev = document.querySelector('.left');
    const next = document.querySelector('.right');
    const container = document.querySelector('.avatars');
    const avatars = document.querySelectorAll('.avatars-container .avatar-item');
    let currentIndex = Math.floor(avatars.length / 2);
    const val = (avatars.length - 1 - Math.floor(avatars.length / 2)) * 195;
    let translateVal = 0;

    for (let i = 0; i < avatars.length; i++) {
      if (i === Math.floor(avatars.length / 2)) {
        avatars[i].classList.add('current');
      }
      avatars[i].addEventListener('click', () => {
        // Remove 'current' class from all avatars
        avatars.forEach((avatar) => {
          avatar.classList.remove('current');
        });

        // Add 'current' class to the clicked avatar
        avatars[i].classList.add('current');

        // Set the selected avatar using its background image URL
        setSelectedAvatar(avatars[i].style.backgroundImage);

        // You can also perform any additional logic here if needed
       
          // Navigate to RockPaperScissorsGame with selected avatar as a query parameter
        // Example: Log the selected avatar URL
        console.log('Selected Avatar:', avatars[i].style.backgroundImage);
      });
    }

    let defaultVal = 0;
    if (avatars.length % 2 === 0) {
      defaultVal = 90;
      translateVal -= 90;
      container.style.transform = `translateX(${translateVal}px)`;
    }
    
    const handlePrevClick = () => {
      if (currentIndex - 1 < 0) {
        avatars[currentIndex].classList.remove('current');
        avatars[avatars.length - 1].classList.add('current');
        currentIndex = avatars.length - 1;
        translateVal = -val - defaultVal;
        container.style.transform = `translateX(${translateVal}px)`;
      } else {
        avatars[currentIndex].classList.remove('current');
        avatars[currentIndex - 1].classList.add('current');
        currentIndex -= 1;
        translateVal += 195;
        container.style.transform = `translateX(${translateVal}px)`;
      }
    };

    const handleNextClick = () => {
      if (currentIndex + 1 >= avatars.length) {
        avatars[currentIndex].classList.remove('current');
        avatars[0].classList.add('current');
        currentIndex = 0;
        translateVal = val + defaultVal;
        container.style.transform = `translateX(${translateVal}px)`;
        return;
      }
      avatars[currentIndex].classList.remove('current');
      avatars[currentIndex + 1].classList.add('current');
      currentIndex += 1;
      translateVal -= 195;
      container.style.transform = `translateX(${translateVal}px)`;
    };

    prev.addEventListener('click', handlePrevClick);
    next.addEventListener('click', handleNextClick);

    return () => {
      // Cleanup event listeners if necessary
      prev.removeEventListener('click', handlePrevClick);
      next.removeEventListener('click', handleNextClick);
    };
  }, []);
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);

    // Navigate to RockPaperScissorsGame with selected avatar as a parameter
    navigate(`/play?avatar=${encodeURIComponent(avatar)}`, { state: { loggedInUser } });
  }; // Empty dependency array to run the effect only once

return (
<div class="choose-avatar">
<p className="user2-info">{loggedInUser}</p>
    <span class="title">Choose your avatar</span>
    <div class="avatars-container">
      <span class="left"></span>
      <div class="avatars">
      <div className="avatar-item" style={{ backgroundImage: "url('/images/alien.png')" }} onClick={() => handleAvatarClick('/images/alien.png')}>
          <span id="text-avatar">Choose</span>
        </div>
        <div className="avatar-item" style={{ backgroundImage: "url('/images/astro.png')"}}onClick={() => handleAvatarClick('/images/astro.png')}>
          <span id="text-avatar">Choose</span>
        </div>
        <div className="avatar-item" style={{ backgroundImage: "url('/images/boo.png')"}}onClick={() => handleAvatarClick('/images/boo.png')}>
          <span id="text-avatar">Choose</span>
        </div>
        <div className="avatar-item" style={{ backgroundImage: "url('/images/ghost.png')"}}onClick={() => handleAvatarClick('/images/ghost.png')}>
          <span id="text-avatar">Choose</span>
        </div>
        <div className="avatar-item" style={{ backgroundImage:"url('/images/ninja.png')"}}onClick={() => handleAvatarClick('/images/ninja.png')}>
          <span id="text-avatar">Choose</span>
        </div>
        <div className="avatar-item" style={{ backgroundImage: "url('/images/robo.png')"}}onClick={() => handleAvatarClick('/images/robo.png')}>
          <span id="text-avatar">Choose</span>
        </div>
        <div className="avatar-item" style={{ backgroundImage:"url('/images/uni.png')"}}onClick={() => handleAvatarClick('/images/uni.png')}>
          <span id="text-avatar">Choose</span>
        </div>
      </div>
      <span class="right"></span>
    </div>
    <div className="button-line">
        <Link to="/" class="login-link">
          <button class="login-button">Back</button>
        </Link>
      </div>
      
  </div>
  )}
  export default AvatarPage;