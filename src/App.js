import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Service } from './Service';

const GqlExample = () => {
  const [data, setData] = useState({ Page: { reviews: [] } });
  const [formData, setFormData] = useState({ reviewId: null, rating: null });
  const query = `{
    Page {
      reviews {
        id
        userId
        summary 
        rating 
        ratingAmount 
        userRating
      }
    }
  }`;

  const mutuation = `{
    RateReview(reviewId:{reviewId}, rating:{rating}) {
      id,
    }
  }`;
  useEffect(() => {
    getReviews();
  }, []);


  const getReviews = () => {
    Service.Gql.Query(query).then(response => {
      if (response) {
        setData(response.data);
      }
    });
  };


  useEffect(() => {
    let postMutuation = mutuation;
    if (formData.reviewId != null && formData.rating != null) {
      Object.keys(formData).forEach(element =>
        postMutuation = postMutuation.replace(`{${element}}`, formData[element]
        ));
  
      Service.Gql.Mutuation(postMutuation).then(response => {
        if (response) {
          getReviews();
        }
      });
    }
   
  }, [formData]);

  return (
    <>
      <div className="row">
        <div className="col-md-6 offset-3">
          <table className="table table-responsive table-dark table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>userId</th>
                <th>summary</th>
                <th>rating</th>
                <th>rating amount</th>
                <th>Up Vote</th>
                <th>Down Vote</th>
              </tr>
            </thead>
            <tbody>
              {
                data.Page.reviews.map((m, i) => (
                  <tr>
                    <td>{m.id}</td>
                    <td>{m.userId}</td>
                    <td>{m.summary}</td>
                    <td>{m.rating}</td>
                    <td>{m.ratingAmount}</td>
                    <td>
                      <span>
                        <button type="button" className="btn-sm btn btn-success" onClick={() => setFormData({ reviewId: m.id, rating: 'UP_VOTE' })}>Up Vote</button>
                      </span>
                    </td>
                    <td>
                      <span>
                        <button type="button" className="btn-sm btn btn-danger" onClick={() => setFormData({ reviewId: m.id, rating: 'DOWN_VOTE' })}>Down Vote</button>
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}


function App() {
  return (
    <div className="App">
      <GqlExample />
    </div>
  );
}

export default App;
