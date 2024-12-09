// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: '', type: '' });
  const [activities, setActivities] = useState([]);

  const addPet = (e) => {
    e.preventDefault();
    setPets([...pets, { ...newPet, id: Date.now() }]);
    setNewPet({ name: '', type: '' });
  };

  const addActivity = (petId, type, details) => {
    setActivities([
      ...activities,
      {
        id: Date.now(),
        petId,
        type,
        details,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pet Health Tracker</title>
        <meta name="description" content="Track your pets exercise and diet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Pet Health Tracker</h1>

        {/* Add New Pet Form */}
        <form onSubmit={addPet} className={styles.form}>
          <input
            type="text"
            placeholder="Pet Name"
            value={newPet.name}
            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pet Type"
            value={newPet.type}
            onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
          />
          <button type="submit">Add Pet</button>
        </form>

        {/* Pet List */}
        <div className={styles.petList}>
          {pets.map((pet) => (
            <div key={pet.id} className={styles.petCard}>
              <h2>{pet.name}</h2>
              <p>Type: {pet.type}</p>
              
              {/* Activity Tracking */}
              <div className={styles.activities}>
                <h3>Add Activity</h3>
                <button onClick={() => addActivity(pet.id, 'exercise', 'Walk')}>
                  Add Walk
                </button>
                <button onClick={() => addActivity(pet.id, 'exercise', 'Play')}>
                  Add Play Time
                </button>
                <button onClick={() => addActivity(pet.id, 'food', 'Meal')}>
                  Add Meal
                </button>

                {/* Activity Log */}
                <div className={styles.activityLog}>
                  <h3>Recent Activities</h3>
                  {activities
                    .filter(activity => activity.petId === pet.id)
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .map(activity => (
                      <div key={activity.id} className={styles.activity}>
                        <p>{activity.type}: {activity.details}</p>
                        <small>{new Date(activity.timestamp).toLocaleString()}</small>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// styles/Home.module.css
export const styles = {
  container: {
    padding: '0 2rem',
  },
  main: {
    minHeight: '100vh',
    padding: '4rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    margin: '0',
    lineHeight: 1.15,
    fontSize: '4rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    gap: '1rem',
    margin: '2rem 0',
  },
  petList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
  },
  petCard: {
    padding: '1.5rem',
    border: '1px solid #eaeaea',
    borderRadius: '10px',
    transition: 'color 0.15s ease, border-color 0.15s ease',
  },
  activities: {
    marginTop: '1rem',
  },
  activityLog: {
    marginTop: '1rem',
  },
  activity: {
    padding: '0.5rem',
    borderBottom: '1px solid #eaeaea',
  },
};
