import { graphql } from 'react-apollo';
import { QueryMe } from './queries';
import { IQueryMe } from '../__generated__/IQueryMe';

export const withMe = graphql<{}, IQueryMe>(QueryMe);
