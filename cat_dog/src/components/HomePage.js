var React = require('react');
var Header = require('./Header');
var Footer = require('./Footer');
var PetGame = require('./PetGame');

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
  border:'1px solid blue'
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
