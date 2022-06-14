// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {AppStorage, Structs} from "../libraries/LibAppStorage.sol";


contract StructMappingFacet {
    AppStorage internal s;

    function mapStruct(Structs _struct) external view returns(uint) {
        return s.structMap[_struct];
    }

    function updateStruct(Structs _struct) external {
        LibDiamond.enforceIsContractOwner();
        s.structMap[_struct] += 1;
    }
}
