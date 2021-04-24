import { Component } from "react";
import Moment from "react-moment";

import "./MoveList.scss";

export class MoveList extends Component {
  state = {
    showMoves: true,
  };

  toggleShowMoves() {
    this.setState((prevState) => ({ showMoves: !prevState.showMoves }));
  }
  render() {
    const { moves, isContact } = this.props;
    const moveItemsHomePage = moves.map((move, index) => (
      <div key={index}>
        <div className="move">To: {move.to.name}</div>
        <div>
          At: <Moment format="YYYY-MM-DD HH:mm" date={move.at} />
        </div>
        <div>Amount: {move.amount}</div>
        <hr />
      </div>
    ));
    const moveItemsContactDetails = moves.map((move, index) => (
      <div key={index}>
        <div>From: {move.fromUser.name}</div>
        <div>
          At: <Moment format="YYYY-MM-DD HH:mm" date={move.at} />
        </div>
        <div>Amount: {move.amount}</div>
        <hr />
      </div>
    ));
    return (
      <div className="moveList">
        {!!moves.length && !isContact && (
          <div className="moves-list">
            {moves.length ===1 &&
            <div>
            <h4>You have {moves.length} move on your account</h4>
            <hr />
            {moveItemsHomePage}
            </div>}
            {moves.length > 1 && moves.length < 3 && 
            <div>
            <h4>You have {moves.length} moves on your account</h4>
            <hr />
            {moveItemsHomePage}
            </div>}
            {moves.length >= 3 && <div> <h4>Your last 3 moves on your account</h4>
            <hr />
            {moveItemsHomePage.slice(moveItemsHomePage.length-3,moveItemsHomePage.length)}
            </div>}
          </div>
        )}
        {!this.state.showMoves && isContact && !!moves.length && (
          <div
            className="show-moves-btn"
            onClick={() => {
              this.toggleShowMoves();
            }}
          >
            Show moves to contact
          </div>
        )}
        {!!moves.length && this.state.showMoves && isContact && (
          <div className="moves-list-contact">
            <h4>Moves to current contact:</h4>
            <hr />
            {moveItemsContactDetails}
            <div
              className="hide-btn"
              onClick={() => {
                this.toggleShowMoves();
              }}
            >
              Hide
            </div>
          </div>
        )}
        {!moves.length && (
            <div className="no-recent-moves">No recent moves on account</div>
        )}
      </div>
    );
  }
}
