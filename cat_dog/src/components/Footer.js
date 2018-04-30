var React = require('react');
var subheaderStyle = {
  textAlign: 'center',
  fontSize: '1.7rem',
  color:'orange',

}
var center = {
  textAlign:'center'
}
var header = {
  backgroundColor:'teal',
  border:'1px solid blue'
}
var headerStyle = {
  textAlign: 'center',
  fontSize: '2rem',
  color: 'rebeccapurple'
};

var Header = function() {
  return (
    <div style={header}>
    <h1 style={headerStyle}>
      FICTIONAL ACCOUNTS
    </h1><h2 style={subheaderStyle}>
    _for_cat_eyes_only_</h2>
    <h5 style={subheaderStyle}>DAT N COG TECH FASHION WEARABLES</h5>
    <p style={center}>All Rights Reserved | thomasmaestas.net | Fictional_Accounts</p>
    </div>
    )};
module.exports = Header;
