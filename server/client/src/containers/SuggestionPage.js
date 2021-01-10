import React from "react";
import Friend from "../components/Friend";

function SuggestionPage() {

    return(
        <div className="container-fluid below-navbar stardust-bg">
            <div className="row ">
            <div className="offset-md-3 col-md-6 offset-sm-2 col-sm-8  suggestion-page-list">
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
              </div>
            </div>
        </div>
    )
}

export default SuggestionPage;