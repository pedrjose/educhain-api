// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Educhain {
    struct Certificate {
        string studentName;
        string studentCPF;
        string courseName;
        uint16 courseDuration;
        string teachingModality;
        string startDate;
        string graduationDate;
        string institutionCNPJ;
    }

    mapping(bytes32 => Certificate) private certificates;

    event CertificateIssued(
        string studentCPF,
        string courseName,
        string institutionCNPJ,
        bytes32 certificateHash
    );

    function issueCertificate(
        string memory _studentName,
        string memory _studentCPF,
        string memory _courseName,
        uint16 _courseDuration,
        string memory _teachingModality,
        string memory _startDate,
        string memory _graduationDate,
        string memory _institutionCNPJ
    ) public {
        bytes32 certificateHash = keccak256(
            abi.encode(
                _studentName,
                _studentCPF,
                _courseName,
                _courseDuration,
                _teachingModality,
                _startDate,
                _graduationDate,
                _institutionCNPJ
            )
        );
        certificates[certificateHash] = Certificate(
            _studentName,
            _studentCPF,
            _courseName,
            _courseDuration,
            _teachingModality,
            _startDate,
            _graduationDate,
            _institutionCNPJ
        );
        emit CertificateIssued(
            _studentCPF,
            _courseName,
            _institutionCNPJ,
            certificateHash
        );
    }

    function validateCertificate(
        bytes32 certificateHash
    ) public view returns (Certificate memory) {
        require(
            bytes(certificates[certificateHash].studentCPF).length > 0,
            "Certificate not found"
        );
        return certificates[certificateHash];
    }
}
