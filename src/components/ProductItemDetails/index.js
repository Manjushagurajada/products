import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {Cookies} from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'

import './index.css'

class ProductItemDetails extends Component {
  state = {productData: {}}

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const formattedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        price: data.price,
        description: data.description,
      }

      this.setState({productData: formattedData})
    }
  }
  renderProductItem = () => {
    const {productData} = this.state
    const {
      imageUrl,
      title,
      id,
      brand,
      totalReviews,
      rating,
      availability,
      price,
      description,
    } = productData
    return (
      <div>
        <div>
          <img src={imageUrl} alt="product" />
          <div>
            <h1>{title}</h1>
            <p>{price}</p>
            <div>
              <div>
                <p>{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p>{totalReviews} Reviews</p>
            </div>
            <p>{description}</p>
            <p>
              <span>Available: </span>
              {availability}
            </p>
            <p>
              <span>Brand: </span>
              {brand}
            </p>
            <hr />
            <div>
              <BsPlusSquare />
              <p>1</p>
              <BsDashSquare />
            </div>
            <button>ADD TO CART</button>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div>
        <Header />
        {this.renderProductItem()}
      </div>
    )
  }
}

export default ProductItemDetails
