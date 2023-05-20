import React, { useContext, useState } from 'react';
import { loadingFalse, nullErrors } from '../utils/utils';
import { ProductsContext } from '../store/Store';
import Error from './Error';
import Loading from './Loading';
const GiveRatings = ({ slug, cancelRating }) => {
    let { dispatch, error, loading, user } = useContext(ProductsContext)
    const [rating, setRating] = useState(0);
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const submitRatings = async () => {
        nullErrors(dispatch)
        dispatch({ type: "DATA_LOADING", payload: { loading: true } })
        let res = await fetch('/ratings', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug, rating, email: user.email })
        })
        let response = await res.json()
        cancelRating()
        if (res.status === 200) {
            nullErrors(dispatch)
            loadingFalse(dispatch)
        }
        else {
            let { error } = response
            loadingFalse(dispatch)
            dispatch({ type: "SET_ERROR", payload: { error } })
        }
    };

    return (
        <div className='rating-component'>
            <h3>Rate Product</h3>
            {error && <Error error={error} />}
            {loading && <Loading />}
            <p>
                <strong>Product:</strong> {slug}
            </p>
            <div>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                    >
                        <i onClick={() => handleRatingChange(star)} className="fa-solid fa-star" style={{
                            cursor: 'pointer',
                            color: star <= rating ? 'yellow' : 'gray',
                        }}></i>
                    </span>
                ))}
            </div>
            {rating > 0 && <p>You have rated: {rating} stars</p>}
            <div className='rating-buttons-container'>
                <button className='cancel-button' onClick={() => { cancelRating() }}>
                    Cancel
                </button>
                <button className='submit-button' onClick={submitRatings
                }>
                    Submit Rating
                </button>
            </div>
        </div>
    );
};

export default GiveRatings;
