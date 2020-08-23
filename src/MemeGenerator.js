import React, { Component } from "react";

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "https://i.imgflip.com/1ur9b0.jpg",
      allMemeImgs: [],
      id: "112126428",
      link: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMeme = this.handleMeme.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randId = this.state.allMemeImgs[randNum].id;
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg, id: randId });
    console.log(randMemeImg, randId);
  }

  handleMeme() {
    const params = {
      template_id: this.state.id,
      text0: this.state.topText,
      text1: this.state.bottomText,
      username: "ashutosh1409",
      password: "Bhole@2020"
    };
    fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data.url);
        this.setState({ link: response.data.url });
      });
  }
  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />

          <button>Gen</button>
          <button onClick={this.handleMeme}>Down</button>
        </form>
        <div className="meme">
          <a href={this.state.link} target="_blank" download>
            Meme
          </a>
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
