import { graphql } from 'react-apollo';
import { QueryMe } from './queries';
import { IQueryMe } from '../__generated-types__';

export const withMe = graphql<{}, IQueryMe>(QueryMe);
