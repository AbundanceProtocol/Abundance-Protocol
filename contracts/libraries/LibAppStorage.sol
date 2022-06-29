// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";

        
enum ReqType { Bid, FundReview, FundChallenge }
enum Urgency { Emergency, Urgent, Expedited, Regular }
enum Structs { PartialBid, FundingReq, FundingBid, UserFunding, Category, ParentCat, Post, InitialReview, InitialReviewValidation, PostReview, PostReviewInflueces, PostReviewAuthors, PostReviewCategories, PostInflueces, PostCategories, PostAuthors, CatPost, PostCats }


struct PartialBid {
    address bidder;
    uint amount;
}

struct FundingReq {
    uint reqId;
    uint amountRequested;
    uint returnRate;
    ReqType reqType;
    uint deadline;
}

struct FundingBid {
    address bidder;
    uint bidId;
    uint amountProvided;
    uint returnRate;
    bool accepted;
}

struct UserFunding {
    address requestingFunds;
    address providingFunds;
    uint amountProvided;
    uint amountRemaining;
    uint returnRate;
    bool accepted;
    bool withdrawn;
}

struct Category {
    uint id;
    string name;
    string catId;
    uint catVotes;
    uint timeCreated;
    uint blockTime;
    string[] tempRelatedCat;
    address[] subscribers;
    ParentCat[] parentCat;
    uint totalPostValue;
}

struct ParentCat {
    string catId;
    address user;
    uint userWeight;
    uint userVote;
} // parent category

struct Post {
    uint id;
    string title;
    string contentHash;
    string initReviewtHash;
    PostCategories[] postCat;
    PostInflueces[] postInf;
    PostAuthors[] postAuth;
    PostReview[] postReview;
    bool initialReview;
    bool challenged;
    address[] reviewsList;
    uint reqExpertise;
    uint lockExpiration;
    uint CrS;
    uint IS;
    uint postValue;
    uint timestamp;
}

struct InitialReview {
    address validator;
    string reviewHash;
    uint validatorTotalWeight;
    uint validatorCatWeight;
    uint timestamp;
    Urgency urgency;
    bool funding;
    uint selfScore;
    uint selfCrS;
    uint selfIS;
    uint postScore;
    uint postCrS;
    uint postIS;
    PostReviewInflueces[] reviewInfluence;
    PostReviewCategories[] reviewCat;
    PostReviewAuthors[] reviewAuthor;
}

struct InitialReviewValidation {
    address validator;
    uint validatorTotalWeight;
    uint validatorCatWeight;
}

struct PostReview {
    address reviewer;
    string reviewHash;
    uint reviewerTotalWeight;
    uint reviewerCatWeight;
    bool accepted;
    uint expectedReviewPercent;
    PostReviewInflueces[] reviewInfluence;
    PostReviewCategories[] reviewCat;
    PostReviewAuthors[] reviewAuthor;
}

struct PostReviewInflueces {
    uint id;
    string contentHash;
    uint percentInfluence;
}

struct PostReviewAuthors {
    address author;
    uint authorWeight;
}

struct PostReviewCategories {
    string catId;
    uint impact;
}

struct PostInflueces {
    uint id;
    string contentHash;
    uint percentInfluence;
}

struct PostCategories {
    string catId;
    uint impact;
}

struct PostAuthors {
    address author;
    string authorName;
    uint authorWeight;
}

struct CatPost {
    string postHash;
    uint catImpact;
    uint postCred;
    uint timestamp;
}

struct PostCats {
    string catHash;
    uint catImpact;
}




struct AppStorage {
    mapping(Structs => uint) structMap;

    mapping(address => mapping(string => CatPost[])) catPost;
    mapping(address => string[]) userCats;

    mapping(uint => Post) idToPost;
    mapping(string => Post) hashToPost;

    mapping(uint => Category) idToCategory;
    mapping(string => Category) hashToCategory;

    mapping(uint => InitialReview) idToInitReview;
    mapping(string => InitialReview) hashInitReview;

    mapping(uint => PostReview) idToPostReview;
    mapping(string => PostReview) hashPostReview;

    mapping(address => uint) totalFundingReq;
    mapping(address => uint) users;
    mapping(address => bool) userAdded;
    address[] keys;
    
    mapping(address => UserFunding[]) userFunding;
    mapping(address => mapping(uint => FundingReq)) fundingReq;
    mapping(address => FundingReq[]) fundingReqs;

    mapping(address => mapping(uint => FundingBid[])) fundingBids;
    mapping(address => mapping(uint => address[])) fundingBidders;
    mapping(address => mapping(uint => address[])) acceptedBidders;

    mapping(address => mapping(uint => mapping(address => FundingBid))) fundingBid;

    mapping(address => mapping(uint => mapping(address => FundingBid))) acceptedBid;

    PostCats[] postCats;
    mapping(address => mapping(address => bool)) approved;
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;
    uint totalSupply;

    // enum ReqType { Bid, FundReview, FundChallenge }
    // enum Urgency { Emergency, Urgent, Expedited, Regular }
    uint time;
    uint num1;
    uint num2;
}

library LibAppStorage {
    function diamondStorage() internal pure returns (AppStorage storage ds) {
        assembly {
            ds.slot := 0
        }
    }
}







    // event CategoryCreated(uint id, string name, string hash);
    // event PostCreated(uint id, string title, string hash);
    // event PostUpdated(uint id, string title, string hash, bool published);
    // event InitReviewCreated(uint id, string postHash, string revHash);
    // event FundingRequested(address user, uint amount, uint percent, uint deadline, ReqType reqType);
    // event FundingBidPosted(address user, address funder, uint amount, uint percent);
    // event BidsAccepted(address user, uint reqId, address[] funders);

    // event ReviewFundingRequest(address user, uint amount, uint percent, uint time);




    
