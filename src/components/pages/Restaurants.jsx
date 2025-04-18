import React, { useState, useEffect } from "react";
import restaurants from "../data.json/restaurants-casvp.json";
import  picture_restaurant from '../../assets/images/picture_restaurant.jpg';
import  kfcapres10ansabsenceretourdoubledown from '../../assets/images/kfcapres10ansabsenceretourdoubledown.jpg';
import  tea from '../../assets/images/tea.jpg';
import  TakeawayDelivery from '../../assets/images/Takeaway & Delivery.jpg';
import  WineCocktails from '../../assets/images/Wine & Cocktails.jpg';
import  AlfrescoDining from '../../assets/images/Alfresco Dining.jpg';
import styles from './Restaurants.module.css';

function Restaurants() {
  const [likes, setLikes] = useState({});
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 22,
    minutes: 48,
    seconds: 22
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = { ...prevTime };
        
        if (newTime.seconds > 0) {
          newTime.seconds -= 1;
        } else {
          newTime.seconds = 59;
          if (newTime.minutes > 0) {
            newTime.minutes -= 1;
          } else {
            newTime.minutes = 59;
            if (newTime.hours > 0) {
              newTime.hours -= 1;
            } else {
              newTime.hours = 23;
              if (newTime.days > 0) {
                newTime.days -= 1;
              }
            }
          }
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLike = (id) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [id]: !prevLikes[id]
    }));
  };

  return (
    <div>
      <div className={styles.image}>
        <img
          src={picture_restaurant}
          alt="Restaurants avec vue à Paris"
        />
        <h1 className={styles.imageTitle}>
          Découvrez <br></br>
          nos restaurants
        </h1>
      </div>

      <h1 className={styles.title}>🍽️ Nos Restaurants</h1>
      <div className={styles.restaurantList}>
        {Array.isArray(restaurants) && restaurants.map((resto, index) => {
          if (!resto.nom_restaurant || !resto.adresse) return null;
          return (
            <div 
              key={index} 
              className={styles.restaurantCard}
              style={{"--card-index": index}}
            >
              <button 
                className={`${styles.likeButton} ${likes[index] ? styles.liked : ''}`}
                onClick={() => handleLike(index)}
                aria-label="Like"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className={styles.heartIcon}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <div className={styles.restaurantInfo}>
                <h2 className={styles.restaurantName}>{resto.nom_restaurant}</h2>
                <p className={styles.restaurantAddress}>{resto.adresse}</p>
                <p className={styles.restaurantLocation}>
                  {resto.code} – {resto.ville}
                </p>
                <p className={styles.restaurantType}>
                  <strong>Type :</strong> {resto.type}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.menulist}>
        <div className={styles.menu}>
          <img
          src={tea}
          alt="Afternoon Tea Experience"
          />
          <h1 className={styles.menuTitle}>
            Afternoon Tea
            </h1>
          <h3 className={styles.menudescription}>
            Dégustez notre sélection de thés rares accompagnés de pâtisseries artisanales
          </h3>
        </div>
        <div className={styles.menu}>
          <img
          src={TakeawayDelivery}
          alt="Takeaway & Delivery Service"
          />
          <h1 className={styles.menuTitle}>
            Takeaway & Delivery
            </h1>
          <h3 className={styles.menudescription}>
            Commandez vos plats préférés et profitez d'une livraison rapide à domicile
          </h3>
        </div>
        <div className={styles.menu}>
          <img
          src={WineCocktails}
          alt="Wine & Cocktails Selection"
          />
          <h1 className={styles.menuTitle}>
            Wine & Cocktails
            </h1>
          <h3 className={styles.menudescription}>
            Découvrez notre carte des vins et nos cocktails signature créés par nos mixologues
          </h3>
        </div>
        <div className={styles.menu}>
          <img
          src={AlfrescoDining}
          alt="Alfresco Dining Experience"
          />
          <h1 className={styles.menuTitle}>
            Alfresco Dining
            </h1>
          <h3 className={styles.menudescription}>
            Profitez d'un repas en plein air avec une vue imprenable sur la ville
          </h3>
        </div>
      </div>
      <div className={styles.menulistchiken}>
        <div className={styles.menuchiken}>
          <img
            src={kfcapres10ansabsenceretourdoubledown}
            alt="KFC Hot Wings Special"
          />
          <div className={styles.menuchikenText}>
            <h4 className={styles.menuchikennom}>Crispy, Every Bite Taste</h4>
            <h1 className={styles.menuchikenTitle}>
              Chiken hot wing & French fries
            </h1>
            <h3 className={styles.menuchikendescription}>
              Wheat tortilla with spicy chicken bites, cheese sauce
              tomatoes and soft cheese
            </h3>
            <div className={styles.chikentime}>
              <div className={styles.timeBlock}>
                <h1 className={styles.timeNumber}>{timeLeft.days}</h1>
                <h3 className={styles.timeLabel}>Days</h3>
              </div>
              <div className={styles.timeBlock}>
                <h1 className={styles.timeNumber}>{timeLeft.hours}</h1>
                <h3 className={styles.timeLabel}>Hours</h3>
              </div>
              <div className={styles.timeBlock}>
                <h1 className={styles.timeNumber}>{timeLeft.minutes}</h1>
                <h3 className={styles.timeLabel}>Min</h3>
              </div>
              <div className={styles.timeBlock}>
                <h1 className={styles.timeNumber}>{timeLeft.seconds}</h1>
                <h3 className={styles.timeLabel}>Sec</h3>
              </div>
            </div>
            <button onClick={() => alert('Commande en cours...')} className={styles.menuchikenbutton}>
              <span className={styles.buttonIcon}>🚚</span>
              Order Now
            </button>
          </div>
        </div>
      </div>
      <div className={styles.menupictures}>
        <img
          src={picture_restaurant}
          alt="Restaurants avec vue à Paris"
        />
        <img
          src={picture_restaurant}
          alt="Restaurants avec vue à Paris"
        />
        <img
          src={picture_restaurant}
          alt="Restaurants avec vue à Paris"
        />
        <img
          src={picture_restaurant}
          alt="Restaurants avec vue à Paris"
        />
      </div>
    </div>
  );
}

export default Restaurants;




