// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AppStorage, PostCats, CatPost} from "../libraries/LibAppStorage.sol";

contract UserScoreFacet {
    AppStorage internal s;

    // function getUserScore(address _user) public view returns(uint) {
    //     uint totalScore = 0;
    //     for (uint i = 0; i < userCats[_user].length; i++) {
    //         string memory _catHash = userCats[_user][i];
    //         for (uint j = 0; j < catPost[_user][_catHash].length; j++) {
    //             totalScore += catPost[_user][_catHash][j].catImpact;
    //         }
    //     }
    // }

    // function getUserCategoryScore(address _user, string memory _catHash) public view virtual returns(uint) {

    // }

    // function fetchPost(string memory _hash) public view returns(Post memory){
    //   return hashToPost[_hash];
    // }

    function saveCatPost(
        address _user,
        string memory _postHash, 
        uint _time,
        uint _postCred,
        PostCats[] memory _postCats
    ) external {
        for (uint i = 0; i < _postCats.length; i++) {
            string memory _catHash = _postCats[i].catHash;
            uint _catImpact = _postCats[i].catImpact;
            if (s.catPost[_user][_catHash].length == 0) {
                s.userCats[_user].push(_catHash);
            }
            s.catPost[_user][_catHash].push(CatPost({ 
                postHash: _postHash, 
                catImpact: _catImpact, 
                postCred: _postCred, 
                timestamp: _time 
            }));
        }
    }
}
