var React = require('react');
var Header = require('./Header');
var Footer = require('./Footer');
var PetGame = require('./PetGame');
// require('./HomePage.css');

var subStyle = {
  textAlign: 'center',
  fontSize: '1.7rem',
  color:'orange',

}
var center = {
  textAlign:'center'
}
var sStyle = {
  backgroundColor:'orange',
  border:'1px solid blue',
  padding:'50px',
  margin:'50px',
  boxShadow:'green, .2, .3, .3',
  fontFamily:'Courier New'
 }
  



var Style = {
  textAlign: 'center',
  fontSize: '2rem',
  color: 'rebeccapurple'
};

var HomePage = function() {
  return (
    <div style={sStyle}>
      <Header />
      <PetGame />
      <Footer />
    </div>
  );
};

module.exports = HomePage;
