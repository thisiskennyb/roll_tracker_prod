import './css/start_here.css'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
      
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? '#5C8093'
        : '#5C8093',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    // borderTop: '1px solid #25272c',
  }));

export default function StartHere () {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    return (

        
        <div className="start-here-container">
            <div className="start-here-title-box">
                <h1 className="start-here-title">Getting Started FAQ</h1>
            </div>
            <div className='start-here-subtitles'>What to look for</div>
            <Accordion id="accordian" expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{backgroundColor: "#67bace", fontFamily: 'Fira Sans Extra Condensed'}}>
        <AccordionSummary aria-controls="panel1d-content" id="panel-header">
          <Typography>Obvious Finds</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <p className='start-here-info'>
        While the coins I will mention provide a comprehensive starting point, they're merely scratching the surface of what's available. You have the freedom to customize your search using the provided resources, which will help you explore the world of documented die varieties for each year. Rather than inspecting each coin individually, you can streamline your search by focusing on specific years, mints, and varieties you aim to find.
          </p>
          <p className='start-here-info'>
          Coins minted before 1959 are particularly interesting, as this marks the transition from the old reverse wheat design to the iconic Lincoln Memorial. This era encompasses coins like the flying eagle, Indian head, and wheat cent. 
          </p>
          <p className='start-here-info'>
          A typical $25 box of coins usually yields between 5 to 15 wheat cents on average. Wheat cents generally don't hold much value, except for those with lower mintages or in pristine condition, but they are still worth holding onto for most collectors. In contrast, Indian heads and flying eagle cents are rare finds and most definitely collectible. 
          </p>
          <p className='start-here-info'>
          A noteworthy more modern cent to look for is the 2009 Lincoln Bicentennial, which features four distinct designs with limited mintages. However, these are only worth keeping if they're in good condition.
          </p>
          <p className='start-here-info'>
          The last of the more distinct coins to be on the lookout for are proof coins. The San Francisco mint makes coins that are bought in sets directly from the mint and are meant to be more of a collectible item than for spending but you will find them in change from time to time. They are distinct because of their mirror-like finish and 's' mint mark. Note that Lincoln memorial cents from 1968-1974 have San Francisco minted coins in circulation that were ‘business struck’, meaning that they were released into the wild for spending.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordian" expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{backgroundColor: "#67bace", fontFamily: 'Fira Sans Extra Condensed'}}>
        <AccordionSummary aria-controls="panel2d-content" id="panel-header">
          <Typography>Key/Semi-Key Dates</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <p className='start-here-info'>
            "Key date" coins are those with dates or date-and-mint mark combinations that are harder to come by compared to other coins in the series. The rarity of these coins is determined by four main factors: mintage, survival numbers, demand, and overall condition. An iconic example in the Lincoln cent series is the 1909 S mint VDB, often referred to as the holy grail key date.
            </p>
            <p className='start-here-info'>
            On the other hand, "semi-key date" coins are valuable but not as rare as key dates. The 1913 S mint cent is a classic example of a semi-key date in the Lincoln cent series.
            </p>
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordian" expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{backgroundColor: "#67bace", fontFamily: 'Fira Sans Extra Condensed'}}>
        <AccordionSummary aria-controls="panel3d-content" id="panel-header">
          <Typography>Die Varieties</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <p className='start-here-info'>
            These are what make coin roll hunting (CRH) truly exciting. Coins with unique variations often command a premium, and there are numerous valuable and collectible die varieties still in circulation. A die variety refers to a distinctive feature on a coin that deviates from the standard design. Coin dies are engraved tools used to stamp details onto blank metal pieces called ‘planchets’ during minting.
            </p>
            <ul>
                <li>
                Transitional Die Varieties
                </li>
                    <p>
                    Transitional design varieties are particularly intriguing. They involve using a design intended for a later year on working dies from the previous year or vice versa. For instance, the 1988 Lincoln cent bears the reverse design of the 1989 cent.
                    <a href="http://doubleddie.com/58348.html">Example here</a>
                    </p>

                <li>
                Wrong Design Varieties
                </li>
                    <p>
                    Wrong design varieties involve using a design for the correct year but on the wrong type of coin planchet. An illustrative case is the 1982 small date Denver mint cent struck on a copper planchet, which stands out because of the transition to zinc-alloy planchets that year
                    <a href="https://www.numismaticnews.net/world-coins/second-1982-d-small-date-copper-alloy-lincoln-cent-discovered">Example here</a>
                    </p>
                <li>
                Doubled Die Varieties
                </li>
                    <p>
                    Doubled die varieties occur when there is a duplication of design elements on a working die created due to a misalignment of the die or hub during the [hubbing](https://en.wikipedia.org/wiki/Hubbing) process. A prime example is the 1955 DDO (Doubled Die Obverse) in the Lincoln cent series.
                    <a href="https://www.pcgs.com/coinfacts/coin/1955-1c-doubled-die-obverse-rb/2826">Example here</a>
                    </p>
            </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordian" expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{backgroundColor: "#67bace", fontFamily: 'Fira Sans Extra Condensed'}}>
        <AccordionSummary aria-controls="panel4d-content" id="panel-header">
          <Typography>Errors</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <p>
            Depending on your personal interest levels, it also may be worth keeping an eye out for different types of errors as well. These have a diverse spectrum of values and usually fetch a premium. I won't go into exhaustive detail about them here but instead leave it up to you for further research. If nothing else it’s worth it to at least be aware of what the different types of errors are so they can be easily identified when you come across them. The following resources will provide more detailed insights into this subject.
            <a href="http://lincolncentsonline.com/error.html">Link</a>
            </p>
        </AccordionDetails>
      </Accordion>
      <div className='start-here-subtitles'>Obtaining/Returning Coinage</div>
      <Accordion id="accordian" expanded={expanded === 'panel5'} onChange={handleChange('panel5')} sx={{backgroundColor: "#67bace", fontFamily: 'Fira Sans Extra Condensed'}}>
        <AccordionSummary aria-controls="panel5d-content" id="panel-header">
          <Typography>Obtaining</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <p className='start-here-info'>
            Acquiring coinage is not always a straightforward process of visiting your bank or credit union and walking away with a box of coins. While most tellers are willing to sell a few rolls, they may hesitate when you request an entire box. Some banks may even require a business account to sell you a full box, although this may not be the case everywhere.
            </p>
            <p className='start-here-info'>
            However, if you face rejection, don't be discouraged! By maintaining a friendly and patient approach, you can usually obtain the desired coinage. Personally, it was challenging for me to acquire a complete box initially, but eventually, I succeeded.
            </p>
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordian" expanded={expanded === 'panel6'} onChange={handleChange('panel6')} sx={{backgroundColor: "#67bace", fontFamily: 'Fira Sans Extra Condensed'}}>
        <AccordionSummary aria-controls="panel6d-content" id="panel-header">
          <Typography>Returning</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <p className='start-here-info'>
                Ideally, you would have one bank branch where you can purchase full boxes of coins and a different branch equipped with a free coin counting machine to deposit all the searched coins. It's important not to return the searched coins to the same bank branch you bought them from unless you are exchanging a box for another box. Unfortunately, this ideal scenario doesn't always exist.
            </p>
            <p className='start-here-info'>
            In some cases, banks will allow you to exchange a searched box for an un-searched one, but it requires you to hand-wrap every time. With the right tools and a systematic approach, this method isn't too cumbersome.
            </p>
        </AccordionDetails>
      </Accordion>
      <div className='start-here-subtitles'>Search/Sort Strategy</div>
      <Accordion id="accordian" expanded={expanded === 'panel7'} onChange={handleChange('panel7')} sx={{backgroundColor: "#67bace", fontFamily: 'Fira Sans Extra Condensed'}}>
        <AccordionSummary aria-controls="panel7d-content" id="panel-header">
          <Typography>Effective Methods</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <p className='start-here-info'>
            There are various approaches to coin roll hunting, and the choice largely depends on personal preference and developing a system that suits you best. It also depends on what you aim to find. If you are a casual coin roll hunter focusing on wheat pennies and well-known varieties, sorting by date may not be necessary. However, if you are a serious collector seeking any available die variety, sorting by decade and then by year is likely the most effective method.
            </p>
            <p className='start-here-info'>
            Once you understand how to identify varieties, sort the coins by decade into solo cups. For each cup, further sort them by year and check for any known varieties specific to that date and mint. Over time, your process may become more refined, and I you longer need to search as extensively (because who has that kind of time). If you have most of the details memorized, it doesn't require as much filtering but instead you can check the dates you know to have the varieties and look as you go. Eventually, you need to determine the value of your time and how deep you want to delve into the details. A couple of helpful tools to spot die varieties and errors are a digital microscope and a handheld loupe. In my opinion, these are essential and relatively inexpensive.
            </p>
        </AccordionDetails>
      </Accordion>
            
        
        
        
        </div>
    )
}