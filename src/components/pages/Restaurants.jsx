import React from "react";
import restaurants from "../data.json/restaurants-casvp.json";
import  picture_restaurant from '../../assets/images/picture_restaurant.jpg';
import  kfcapres10ansabsenceretourdoubledown from '../../assets/images/kfcapres10ansabsenceretourdoubledown.jpg';
import  tea from '../../assets/images/tea.jpg';
import  TakeawayDelivery from '../../assets/images/Takeaway & Delivery.jpg';
import  WineCocktails from '../../assets/images/Wine & Cocktails.jpg';
import  AlfrescoDining from '../../assets/images/Alfresco Dining.jpg';
import styles from './Restaurants.module.css';

function Restaurants() {
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
          // Vérifie que le restaurant est valide (pas null ou incomplet)
          if (!resto.nom_restaurant || !resto.adresse) return null;
          return (
            <div key={index} className={styles.restaurantCard}>
              <h2 className={styles.restaurantName}>{resto.nom_restaurant}</h2>
              <p className={styles.restaurantAddress}>{resto.adresse}</p>
              <p className={styles.restaurantLocation}>
                {resto.code} – {resto.ville}
              </p>
              <p className={styles.restaurantType}>
                <strong>Type :</strong> {resto.type}
              </p>
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
      alt="Restaurants avec vue à Paris"
    />
    <div className={styles.menuchikenText}>
      <h4 className={styles.menuchikennom}>Crispy, Every Bite Taste </h4>
      <h1 className={styles.menuchikenTitle}>Chiken hot
      wing & French fries</h1>
      <h3 className={styles.menuchikendescription}>
      Wheat tortilla with spicy chicken bites, cheese sauce
      tomatoes and soft cheese
      </h3>
      <div className={styles.chikentime}>
        <div className={styles.menuchikendays}>
          <h1 className={styles.menuchikenDays}>30</h1>
          <h3 className={styles.menuchikendays}> Days </h3>
        </div>
        <div className={styles.menuchikendays}>
          <h1 className={styles.menuchikenHours}>22</h1>
          <h3 className={styles.menuchikenhours}> Hours </h3>
        </div>
        <div className={styles.menuchikendays}>
          <h1 className={styles.menuchikenMinu}>48</h1>
          <h3 className={styles.menuchikenmin}> Min </h3>
        </div>
        <div className={styles.menuchikendays}>
          <h1 className={styles.menuchikenSec}>22</h1>
          <h3 className={styles.menuchikensec}> Sec </h3>
        </div>
        <button onClick={() => alert('Réserver maintenant')} className={styles.menuchikenbutton}>Order Now </button>
      </div>   
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




