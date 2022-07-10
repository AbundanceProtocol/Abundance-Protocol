// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AppStorage, PostAuthors, Post} from "../libraries/LibAppStorage.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PostsFacet {
    AppStorage internal s;

    event PostCreated(uint id, string title, string hash);

    using Counters for Counters.Counter;
    Counters.Counter internal _postIds;

    function createPost(string memory _title, string memory _hash, PostAuthors[] memory _authors) external {
        // require(_percent < 100000);
        _postIds.increment();
        uint postId = _postIds.current();
        Post storage post = s.idToPost[postId];
        post.id = postId;
        post.title = _title;
        post.contentHash = _hash;
        post.initialReview = false;
        post.challenged = false;
        post.reqExpertise = 0;
        post.lockExpiration = block.timestamp;
        post.CrS = 0;
        post.IS = 0;
        post.postValue = 0;
        post.timestamp = block.timestamp;
        for (uint i = 0; i < _authors.length; i++) {
            post.postAuth.push(_authors[i]);
        }
        s.idToPost[postId] = post;
        s.hashToPost[_hash] = post;
        emit PostCreated(postId, _title, _hash);
    }

    function fetchPost(string memory hash) external view returns(Post memory) {
        return s.hashToPost[hash];
    }

    function fetchPostTitle(string memory hash) external view returns(string memory) {
        return s.hashToPost[hash].title;
    }
 
    function fetchPosts() external view returns (Post[] memory) {
        uint itemCount = _postIds.current();
        Post[] memory posts = new Post[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Post storage currentItem = s.idToPost[currentId];
            posts[i] = currentItem;
        }
        return posts;
    }
}
