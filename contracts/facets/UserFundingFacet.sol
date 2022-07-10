// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AppStorage, ReqType, FundingReq, FundingBid, PartialBid} from "../libraries/LibAppStorage.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract UserFundingFacet {
    AppStorage internal s;

    using Counters for Counters.Counter;
    Counters.Counter internal _fundingReqId;

    event FundingRequested(address user, uint amount, uint percent, uint deadline, ReqType reqType);
    event FundingBidPosted(address user, address funder, uint amount, uint percent);
    event BidsAccepted(address user, uint reqId, address[] funders);

    function requestFunding(uint _amount, uint _percentReturn, uint _deadline, ReqType _reqType) external {
        _fundingReqId.increment();
        uint fundingReqId = _fundingReqId.current();
        FundingReq memory _fundingReq = FundingReq({
            reqId: fundingReqId,
            amountRequested: _amount,
            returnRate: _percentReturn,
            reqType: _reqType,
            deadline: _deadline
        });
        s.fundingReq[msg.sender][fundingReqId] = _fundingReq;
        s.fundingReqs[msg.sender].push(_fundingReq);
        s.totalFundingReq[msg.sender] += _amount;
        emit FundingRequested(msg.sender, _amount, _percentReturn, _deadline, _reqType);
    }

    function getFundingReq(address _user, uint _reqId) external view returns(FundingReq memory) {
        return s.fundingReq[_user][_reqId];
    }

    function getAllFundingReqs(address _user) external view returns(FundingReq[] memory) {
        return s.fundingReqs[_user];
    }

    function getAcceptedBids(address _user, uint _reqId) external view returns(address[] memory) {
        return s.acceptedBidders[_user][_reqId];
    }

    function getAcceptedBid(address _user, uint _reqId, address _bidder) external view returns(FundingBid memory) {
        return s.acceptedBid[_user][_reqId][_bidder];
    }

    function requestReviewFunding(uint _amount, uint _percent, ReqType _reqType) external {
        // add: string memory _reviewHash
        // need to address reviewHash issue
        _fundingReqId.increment();
        uint fundingReqId = _fundingReqId.current();
        FundingReq memory _fundingReq = FundingReq({
            reqId: fundingReqId,
            amountRequested: _amount,
            returnRate: _percent,
            reqType: _reqType,
            deadline: block.timestamp + 720
        });
        s.fundingReq[msg.sender][fundingReqId] = _fundingReq;
        s.fundingReqs[msg.sender].push(_fundingReq);

        emit FundingRequested(msg.sender, _amount, _percent, block.timestamp + 720, _reqType);
    }

    function bidFunding(address _user, uint _reqId, uint _amount, uint _percent) external {
        require(s.fundingReq[_user][_reqId].deadline > block.timestamp);
        require(s.fundingReq[_user][_reqId].returnRate <= _percent);
        _fundingReqId.increment();
        uint fundingBidId = _fundingReqId.current();
        s.fundingBid[_user][_reqId][msg.sender] = FundingBid({
            bidder: msg.sender,
            bidId: fundingBidId,
            amountProvided: _amount,
            returnRate: _percent,
            accepted: false
        });
        s.fundingBidders[_user][_reqId].push(msg.sender);
        emit FundingBidPosted(_user, msg.sender, _amount, _percent);
    }

    function cancelBid(address _user, uint _reqId, uint _bidId) external {
        delete s.fundingBid[_user][_reqId][msg.sender];
        for (uint i = 0; i < s.fundingBids[_user][_reqId].length; i++) {
            if (s.fundingBids[_user][_reqId][i].bidId == _bidId) {
                delete s.fundingBids[_user][_reqId][i];
            }
        }
    }

    function findBidder(address _user, uint _reqId, address _bidder) view public returns(FundingBid memory) {
        return s.fundingBid[_user][_reqId][_bidder];
    }

    function acceptBids(uint _reqId, address[] memory _addresses, PartialBid memory _partial) external {
        require(s.fundingReq[msg.sender][_reqId].deadline < block.timestamp);

        require(acceptBidsFraudProof(msg.sender, _reqId, _addresses, _partial));

        for (uint i = 0; i < _addresses.length - 1; i++) {
            s.acceptedBidders[msg.sender][_reqId].push(_addresses[i]);
            s.acceptedBid[msg.sender][_reqId][_addresses[i]] = findBidder(msg.sender, _reqId, _addresses[i]);
        }
        s.acceptedBidders[msg.sender][_reqId].push(_addresses[_addresses.length - 1]);
        if (_partial.amount == 0) {
           s.acceptedBid[msg.sender][_reqId][_addresses[_addresses.length - 1]] = findBidder(msg.sender, _reqId, _addresses[_addresses.length - 1]);
        } else {
            FundingBid memory _fundingBid = findBidder(msg.sender, _reqId, _addresses[_addresses.length - 1]);
            _fundingBid.amountProvided = _partial.amount;
            s.acceptedBid[msg.sender][_reqId][_addresses[_addresses.length - 1]] = _fundingBid;
        }
        emit BidsAccepted(msg.sender, _reqId, _addresses);
    }

    function acceptBidsFraudProof(address _user, uint _reqId, address[] memory _addresses, PartialBid memory _partial) view public returns (bool) {
        bool noFraud = true;
        uint _amountRequested = s.fundingReq[_user][_reqId].amountRequested;
        uint _bidAmount = 0;
        for (uint i = 0; i < _addresses.length - 1; i++) {
            uint _bid = findBidder(_user, _reqId, _addresses[i]).amountProvided;
            _bidAmount += _bid;
        }
        if (_partial.amount == 0) {
            _bidAmount += findBidder(_user, _reqId, _addresses[_addresses.length - 1]).amountProvided;
        } else {
            _bidAmount += _partial.amount;
        }

        if (_amountRequested >= _bidAmount) {
            return noFraud;
        } else {
            return !noFraud;
        }
    }

    function calculateLowestBids(uint _reqId) view external returns(address[] memory, PartialBid memory) {
        uint _amountRequested = s.fundingReq[msg.sender][_reqId].amountRequested;
        uint totalBid = 0;
        FundingBid[] memory _fundingBids = s.fundingBids[msg.sender][_reqId];
        address[] memory acceptedBids = new address[](_fundingBids.length);
        uint _amountProvided;
        uint _returnRate = _fundingBids[0].returnRate;
        uint _index = 0;
        for (uint j = 0; j < _fundingBids.length; j++) {

            if (totalBid < _amountRequested) {
                for (uint i = 0; i < _fundingBids.length; i++) {
                    if (!_fundingBids[i].accepted && _fundingBids[i].returnRate <= _returnRate) {
                        _returnRate = _fundingBids[i].returnRate;
                        _index = i;
                    }
                }
                _amountProvided = _fundingBids[_index].amountProvided;
                _fundingBids[_index].accepted = true;
                acceptedBids[_index] = _fundingBids[_index].bidder;
                if (totalBid + _amountProvided > _amountRequested) {
                    uint _partial = _amountRequested - totalBid;
                    return (acceptedBids, PartialBid(acceptedBids[_index], _partial));
                } else {
                    totalBid += _fundingBids[_index].amountProvided;
                }
            }
        }
        return (acceptedBids, PartialBid(acceptedBids[_index], 0));
    }
}
