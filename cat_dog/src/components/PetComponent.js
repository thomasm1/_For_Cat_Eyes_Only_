var React = require('react');
var constants = require('../constants');

var compStyle = {
  display: 'inline-block',
  marginLeft: 'auto',
  marginRight: 'auto'
};

var btnStyle = {
  height: '25px',
  width: '70px',
  marginTop: '10px',
  marginLeft: '5px',
  marginRight: '5px'
};

var LOSER = constants.LOSER;
var WINSLOW = constants.WINSLOW;

var PetComponent = function(props) {
  var result = null;
  var disabled = false;

  if (props.result !== '') {
    var resultStyle = {};
    if (props.result === LOSER) {
      resultStyle = { color: 'red' };
    } else {
      resultStyle = { color: 'green' };
    }
    result = <h2 style={resultStyle}>{props.result}</h2>;
    disabled = true;
  }

  return (
    <div style={compStyle}>
      {result}
      {(props.result) ? (
        <h3>{props.petName} Likes: {props.likesCount}</h3>
      ) : (
        <h3>{props.petName}</h3>
      )}
      <img style={{height:400, width:400}} src={props.petImageUrl} alt={WINSLOW+ ' ' +props.petName} />
      <br />
      <button style={btnStyle} value={props.petName} disabled={disabled} onClick={props.onLikeBtnClick}>Like</button>
      <button style={btnStyle} value={props.petName} disabled={disabled} onClick={props.onDislikeBtnClick}>Dislike</button>
    </div>
  );
};

module.exports = PetComponent;
