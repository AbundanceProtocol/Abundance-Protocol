// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AppStorage, PostReviewInflueces, PostReviewCategories, PostReviewAuthors, Post, InitialReview} from "../libraries/LibAppStorage.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract InitialReviewFacet {
    AppStorage internal s;

    event InitReviewCreated(uint id, string postHash, string revHash);

    using Counters for Counters.Counter;
    Counters.Counter internal _initReviewIds;

    function createInitialReview(
        string memory _postHash, 
        string memory _reviewHash, 
        uint _validatorTotalWeight, 
        uint _validatorCatWeight, 
        uint _timestamp,
        // Urgency _urgency,
        // bool funding,
        // uint _selfCrS,
        // uint _selfIS,
        // uint _postCrS,
        // uint _postIS,
        PostReviewInflueces[] memory _reviewInfluence,
        PostReviewCategories[] memory _reviewCat,
        PostReviewAuthors[] memory _reviewAuthor
    ) external {
        require (_timestamp + 300 > block.timestamp);
        Post storage reviewPost = s.hashToPost[_postHash];
        require(!reviewPost.initialReview);
        _initReviewIds.increment();
        uint initReviewIds = _initReviewIds.current();
        reviewPost.initialReview = true;
        reviewPost.initReviewtHash = _reviewHash;
        InitialReview storage initReview = s.idToInitReview[initReviewIds];
        initReview.validator = msg.sender;
        initReview.reviewHash = _reviewHash;
        initReview.validatorTotalWeight = _validatorTotalWeight;
        initReview.validatorCatWeight = _validatorCatWeight;
        initReview.timestamp = _timestamp;
        for (uint i = 0; i < _reviewInfluence.length; i++) {
            initReview.reviewInfluence.push(_reviewInfluence[i]);
        }
        for (uint i = 0; i < _reviewCat.length; i++) {
            initReview.reviewCat.push(_reviewCat[i]);
        }
        for (uint i = 0; i < _reviewAuthor.length; i++) {
            initReview.reviewAuthor.push(_reviewAuthor[i]);
        }

        s.idToInitReview[initReviewIds] = initReview;
        s.hashInitReview[_reviewHash] = initReview;
        s.idToPost[reviewPost.id] = reviewPost;
        s.hashToPost[_postHash] = reviewPost;
        emit InitReviewCreated(initReviewIds, _postHash, _reviewHash);
    }

    function fetchInitReviewByPoat(string memory _hash) external view returns(InitialReview memory) {
        string memory reviewHash = s.hashToPost[_hash].initReviewtHash;
        return s.hashInitReview[reviewHash];
    }

    function fetchInitReview(string memory _hash) external view returns(InitialReview memory) {
        return s.hashInitReview[_hash];
    }
}
