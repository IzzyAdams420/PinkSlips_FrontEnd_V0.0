import  React from "react";
import { useState } from "react";
import { Backdrop } from '@material-ui/core';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'

import MarkdownPreview from "@uiw/react-markdown-preview";

import headerImage from './rsrc/imgs/ColoredBadgesHeader_6.png';

const aboutColoredBadgesPreview = `
>\

## Lets not all be grey
`;

const aboutColoredBadgesFull = `
>\
## Lets not all be grey
-------

The beauty of psuedo-anonymous wallet-based identities becomes limited by the monotonous nature and lack of individuality present. Projects from 3Box to ENS provide an interface for personal expression and differentiation from other generic wallet addresses, allowing individuals to build community rapport with a non-abitrary identity. While such services provide others with an easier way to identify or recognize an individual, this identity is generally limited to the information one supplies about themselves. 
To enhance the utility of personalized block-chain identities, I propose a system of behaviour tracking tokens - henceforth referred to as badges – with limited recipient-transfer abilities. Within this system, a series of badges can be issued to a wallet based upon another user's appreciation of, or dissatisfaction with, their interactions: providing a user-friendly way for others to query the social-integrity of a given wallet. Each badge issued is unique, and holds a log of the issuer, the receiver, and the ‘accusation’ for which it was issued.

For the sake of simplicity I will limit this read me to the discussion of two badge types - 'PinkSlips' and 'GoldenStars' - whereas 'PinkSlips' can be issued for socially-negative behaviours, and GoldenStars can be issued for socially-beneficial behaviours.                        

-------------------

Goals:
-------
Initial focus will be dedicated to the development of the PinkSlip micro-economy, with the eventual goal being to provide an open protocol for other apps to integrate as a social reward / screening mechanism once the system has been battle-proven.

-------------------

Governance:
-------
This system relies upon two governance systems, 'The Court' and 'The Jury',  each with a different set of roles and responsibilities. 'The Court' shall govern with Gavels (250 supply) and 'The Jury' shall govern with Red Pens (480,000,000 supply). Neither Gavels nor RedPens hold any monetary value, and should be considered completely valueless.

The Court (Gavel Holders): High-impact protocol decisions relating to the overall safety, integrity, or continuation of the protocol fall into the scope of responsibilities held by a board of trustees referred to as 'The Court'. 'The Court' holds the exclusive ability to (a) distribute surplus Red Pens or (b) destruct the protocol. Given the sensitivity, 'The Court' shall be governed by a handful of trusted and elected DAOs, in addition to any community members who have made exceptional contributions to the protocol. This shall be accomplished with the issuance of 250 Gavels, each representing one vote on the board.  When possible, Gavels should be issued to a DAO multi-sig, where they can then be delegated to an individual if desired. Surplus gavels may be distributed at The Jury’s discretion. Gavels are fully transferable between any party.

The Jury (Red Pen Holders): Decisions relating to the issuance or appeal of badges - in addition to the growth and development of the protocol - are the responsibility of Red Pen holders. In addition, decisions relating to the appeal of badges are also the responsibility of the pen holders. Red Pens are fully transferable, and can be staked in 'The Jury Pool' to receive interest-bearing 'Jury Hat' tokens (Hats).

Jury Hats / The Jury Pool: 
Jury Hats yield interest in Red Pens. While any pen holder may vote on any appeal, they are not required to do so. Hence, the jury pool serves to ensure there is a group of willing-and-able jurors ready to resolve new disputes. In order to ensure a pool of willing-and-able jurors to resolve said disputes, Jury Hat holders are subject to receiving a jury summons at any time.
Upon receipt of a jury summons, a Jury Hat holder has 24 hours to review the assigned case and issue a verdict vote. Failure to issue a verdict on an assigned case shall result in a portion of the users Jury Hat tokens being slashed and burned, yielding an increased Pen/Hat trade ratio for the pool. With Jury Hat yields inversely correlated with jury participation, individuals are best served when they abide by their jury obligations, but others do not. 

-----------------

Abuse Prevention
-------

Jerks:
-------
Because some people will likely abuse the protocol, they can be designated as ‘Jerks’. While it’s likely a Jerk may just move to a new wallet to escape their Jerk status, this does mean they will have to eat any associated moving costs, while still risking bounty hunters finding their new address. Jerks may be designated as such by the Jury, or by surpassing a particular PinkSlip/GoldenStar ratio. Jerk sanctions can be modified at the juries discretion.

Bounty Hunters:
-------
While evasion tactics will work in the short term, individuals may choose to earn additional RedPens by working as bounty hunters. Bounty Hunters serve the community by identifying Jerks who have attempted to evade their PinkSlips or Jerk status. With the submission of appropriate on-chain evidence, a bounty hunter may submit a bounty proposal to the Jury, who will review the case and issue a verdict / reward. Bounty limits may be implemented, and bounty awards may be adjusted, by the Jury if deemed necessary. Any abuse of the bounty system shall result in the abuser being designated as a Jerk.

Transfers, Burns, and Issuance:
-------
Badge transfers are limited to the sender, the jury, and the court. Any attempts to transfer or burn a GoldenStar will fail, while attempts to transfer or burn a PinkSlip will result in the issuance of an additional PinkSlip. Self-issuance is prohibited, and results in a PinkSlip being issued to the violator. 

Badge Minting Charge (in !RED):
-------
To enable individuals to issue badges, while attempting to reduce the likelihood of protocol abuse, issuance of any badges will have an associated fee, starting at 3 Red Pens. This rate is able to be changed at the discretion of the jury. Fees from PinkSlip issuance are split 80/20 and deposited into the treasury and the Jury Pool, respectively. Fees from GoldenStar issuance are split 50/50 between the treasury and the GoldenStar Receiver.



-------------------

Appeals Process:
-------
Users who feel they have been wrongfully cited may appeal their PinkSlip at anytime. Filing an appeal creates a new jury proposal, which must be accompanied by a written testimony. For more complicated appeals involving a dispute between two parties, a forum-based ‘court room’ will be available for each party to make their case and provide accompanying evidence to the jury.
A GRANTED appeal will result in the burning of the PinkSlip, while a DENIED appeal is subject to the issuance of an additional PinkSlip at discretion of the jury. Appeals are free, but court fees may be implemented by the jury if necessary to prevent abuse.

-------------------

RedPens and Gavel Tokenomics:
-------
	In order for the economy to thrive, distribution must be fair. The goal of these tokens IS NOT to buy you a Lamborghini, but instead to hold value in the form of social-vocal power. Hence, the supply should be as evenly distributed as possible, to prevent the imbalance of social-vocal power.

Public Distribution:
----------

Red Pen tokens will be distributed in several phases, split between community contributors and potential users. With the exception of early project-contributors (you?), Gavels are reserved for community-elected DAOs or otherwise chosen industry leaders.
(If you want to help, please do! We welcome anyone who wants to jump on board, regardless of experience level)

RED PENS (Total Supply: 480,000,000):
-------
    ◦ The initial public distribution of RedPens will go out to (non-contract)
    holders of Honey, HAUS, CLR, Agave, stakedAgave, Alvin, and STAKE.

    ◦ Secondary public distribution will be distributed based upon governance
    participation in various (TBD) L1 protocols.

    ◦ Tertiary public distributions will allow active, but otherwise-non-eligible,
    wallets to claim a share of RedPens (abuse will be subject to the issuance of a PinkSlip).


GAVELS (Total Supply: 250):
-------
    • A limited number of Gavels will be distributed to early contributors,
    proportional to a users contributions to the protocol.

    • The initial public distribution of 25 Gavels will result in 1 gavel
    allocated to each xDAI validator (including 1hive), in addition to AGAVE,
    BrightID, DAOHAUS, SushiSwap, and up to 3 individual community contributors.

    • The remainder of the Gavels will be distributed to eligible or elected DAOs
    through a manual redemption process, with a reserve withheld so that additional
    DAOs may submit a proposal to be elected.

Note: Deployment to other chains will coincide with additional Gavel and RedPen distributions, with strategies yet to be decided

-------------------

Jury-Determined Variables:
-------
    • Badge Minting Price (priced in Red Pens)
    • Jury Pool Slashing Rate
    • Bounty Rewards
    • Bounty Limits
    • Bounty Requirements (i.e gold stars)
    • The Jerk Threshold
`;



export default function AboutBadges() {

  const [isExpanded, setIsExpanded] = useState(false);
  const [aboutColoredBadgesVar, setAboutColoredBadgesVar] = useState(aboutColoredBadgesPreview);

  const toggleAboutLength = () => { 

    
    setIsExpanded(!isExpanded);
    
  }

  return (

  <Jumbotron style={{justifyContent: "center"}}>
    <Container className="aboutBadgesContainer" style={isExpanded ? {backgroundColor: "aliceblue"} : {backgroundColor: "transparent"}}>
      <Row>
        <Col style={{justifyContent: "center"}}>
          <Row>
            <Image style={{alignContent: "center", padding: 0, marginRight: "-5", marginLeft: "-5"}} alt="Header" src={headerImage} />
          </Row>
          {isExpanded ? <><Button variant="warning" onClick={toggleAboutLength} style={{backgroundColor: "aliceblue"}}>x</Button><br /><br /></>: null }
          <MarkdownPreview style={isExpanded ? {color: "black"} : {color: "white", fontSize:"105%"}} source={!isExpanded ? aboutColoredBadgesPreview : aboutColoredBadgesFull } />
          <br />
          <Button variant="warning" onClick={toggleAboutLength} style={{backgroundColor: "white"}}> {isExpanded ? "Read Less" : "Read our Gold Paper" } </Button>
        </Col>
      </Row>
    </Container>
  </Jumbotron>

  )
}