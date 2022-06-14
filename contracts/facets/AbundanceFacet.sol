// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AppStorage} from "../libraries/LibAppStorage.sol";
import {LibERC20} from "../libraries/LibERC20.sol";
import {IERC20} from "../interfaces/IERC20.sol";

contract AbundanceFacet {
    AppStorage internal s;

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    // constructor(uint256 _supply) ERC20("Webcoin", "WEB") {
    //     _mint(msg.sender, _supply);
    //     s.time = block.timestamp + 50;
    //     emit Transfer(address(0), msg.sender, _supply);
    // }

    function name() external pure returns (string memory) {
        return "Webcoin";
    }

    function symbol() external pure returns (string memory) {
        return "WEB";
    }

    function decimals() external pure returns (uint8) {
        return 18;
    }

    function totalSupply() public view returns (uint256) {
        return s.totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        balance = s.balances[_owner];
    }


    function mint(address _receiver, uint256 _value) external {
        // LibDiamond.enforceIsContractOwner();
        require(_receiver != address(0), "_to cannot be zero address");        
        s.balances[_receiver] += _value;
        s.totalSupply += _value;            
        emit LibERC20.Transfer(address(0), _receiver, _value);        
    }


    // function mint(address receiver, uint amount) public timeLock {
    //     _mint(receiver, amount);
    //     emit Transfer(address(0), receiver, amount);
    // }

    function progress() internal view timeLock returns(uint) {
        uint timestamp = block.timestamp;
        return timestamp;
    }

    function _timeLock() private view {
        require(block.timestamp > s.time, "Tokens locked");
    }

    modifier timeLock() {
        _timeLock();
        _;
    }
}
