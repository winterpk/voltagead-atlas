import * as MENUS from 'constants/menus';

import { classNames as cn } from 'utils';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { NavigationMenu, SkipNavigationLink } from 'components';

// import Velocity from 'velocity-animate';
import styles from './Header.module.scss';
/**
 * A Header component
 * @param {Props} props The props object.
 * @param {string} props.className An optional className to be added to the container.
 * @return {React.ReactElement} The FeaturedImage component.
 */
export default function Header({ className }) {
  const [isNavShown, setIsNavShown] = useState(false);
  const headerClasses = cn([styles.header, className]);
  const navClasses = cn([
    styles['primary-navigation'],
    isNavShown ? styles['show'] : undefined,
    // styles['show'],
  ]);

  const handleMouseOver = () => {
    setIsNavShown(true)
  }

  const handleMouseOut = () => {
    setIsNavShown(false)
  }

  return (
    <header
      className={headerClasses}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <SkipNavigationLink />
      <div>
        <div className={styles['logo']}>
          <Link href="/">
            <a title="Home" className="uppercase text-[22px] font-thin">
              <Image
                src="/voltage-bolt.jpg"
                width={50}
                height={50}
                alt="VoltageAD logo"
                layout="responsive"
              />
            </a>
          </Link>
        </div>
        <NavigationMenu
          className={navClasses}
          menuLocation={MENUS.PRIMARY_LOCATION}
        >
          <li className={styles['search-icon']}>
            <Link href="/search">
              <a className="text-white">
                <FaSearch title="Search" role="img" />
              </a>
            </Link>
          </li>
        </NavigationMenu>
      </div>
    </header>
  );
}
